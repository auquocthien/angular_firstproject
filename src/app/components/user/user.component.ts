import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/action/user.action';
import { IUser } from './models/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
})
export class UserComponent {
  user: IUser | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  profileForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  handleSubmit() {
    try {
      if (this.profileForm.valid) {
        const { username, password } = this.profileForm.value;
        if (username && password) {
          const user$ = this.userService.login(username, password);
          if (user$) {
            user$.subscribe((user) => {
              if (user) {
                this.user = user;
                if (this.user) {
                  this.store.dispatch(AuthActions.login({ user: this.user }));
                  this.router.navigate(['todo', this.user?.userAccount.userId]);
                  // this.router.navigate(['']);
                }
              }
            });
          }
        }
      }
    } catch (error) {
      console.log('[handleSubmit]: ', error);
    }
  }
}
