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
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
})
export class UserComponent {
  constructor(private userService: UserService, private router: Router) {}
  profileForm = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  handleSubmit() {
    if (this.profileForm.valid) {
      const { username, password } = this.profileForm.value;
      if (username && password) {
        const user = this.userService.login(username, password);
        if (user) {
          this.router.navigate(['todo', user.userId]);
        }
      }
    }
  }
}
