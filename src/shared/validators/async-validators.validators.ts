import { inject } from '@angular/core';
import { UserService } from '../../app/components/user/services/user.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { map, Observable } from 'rxjs';

export class CustomAsyncValidators {
  static checkUsername(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService
        .checkUserNameExits(control.value)
        .pipe(map((result) => (result ? { usernameExits: true } : null)));
    };
  }
}
