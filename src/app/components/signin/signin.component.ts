import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/action/user.action';
import { IUser } from '../../../shared/models/user.model';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { catchError, switchMap, take, tap, throwError } from 'rxjs';
import { transformUserInfo } from '../../../shared/helper/transform-user-info';
@Component({
  selector: 'app-user',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
})
export class SigninComponent {
  user: IUser | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private localService: LocalStorageService
  ) {}

  profileForm = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  handleSubmit() {
    if (this.profileForm.valid) {
      const { email, password } = this.profileForm.value;
      if (email && password) {
        this.authService
          .signin(email, password)
          .pipe(
            switchMap((res) => {
              console.log(res);

              this.localService.setItem('idToken', res.idToken);
              this.localService.setItem('uuid', res.localId);
              this.localService.setItem('refreshToken', res.refreshToken);
              this.localService.setItem('expiresIn', res.expiresIn);
              this.authService.isAuth = true;

              return this.authService.getUserProfile(res.localId);
            }),
            tap((profile) => {
              console.log(profile);
              const uuid = this.localService.getItem('uuid');

              this.store.dispatch(
                AuthActions.login({ user: transformUserInfo(profile, uuid) })
              );
              this.router.navigate(['todo', uuid]);
            }),
            catchError((error) => {
              console.log(error);
              return throwError(() => error);
            })
          )
          .subscribe();
      }
    }
  }
}
