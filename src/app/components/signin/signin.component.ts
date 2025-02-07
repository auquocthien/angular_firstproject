import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/action/user.action';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { catchError, tap, throwError } from 'rxjs';
import { transformUserInfo } from '../../../shared/helper/transform-user-info';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [ReactiveFormsModule, NgIf, RouterLink],
})
export class SigninComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private localService: LocalStorageService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.autoLogin();
  }

  // Handle automatic login if token exists
  private autoLogin(): void {
    const token = this.localService.getItem('idToken');
    const uuid = this.localService.getItem('uuid');

    if (token && uuid) {
      this.authService
        .getUserProfile(uuid)
        .pipe(
          tap((profile) => {
            this.toaster.success('you already logged in');
            this.authService.auth = true;
            this.handleSuccessfulLogin(profile);
          }),
          catchError((error) => {
            console.error('Auto login failed:', error);
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }

  // Handle form submission
  handleSubmit(): void {
    if (this.profileForm.invalid) return;

    const { email, password } = this.profileForm.value;
    if (!email || !password) return;

    this.signinUser(email, password);
  }

  // Sign in the user and handle profile fetching
  private signinUser(email: string, password: string): void {
    this.authService.signin(email, password).subscribe((profile) => {
      this.handleSuccessfulLogin(profile);
    });
  }

  // Dispatch login action and navigate to todo page
  private handleSuccessfulLogin(profile: any): void {
    const uuid = this.localService.getItem('uuid');
    this.store.dispatch(
      AuthActions.login({ user: transformUserInfo(profile, uuid) })
    );
    this.router.navigate(['todo', uuid]);
  }
}
