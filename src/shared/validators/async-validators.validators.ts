import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { map, Observable } from 'rxjs';

export class CustomAsyncValidators {
  static checkUsername(AuthService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return AuthService.checkUserNameExits(control.value).pipe(
        map((result) => (result ? { usernameExits: true } : null))
      );
    };
  }
}
