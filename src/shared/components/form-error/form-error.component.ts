import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [NgIf],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  @Input() control: AbstractControl;
  @Input() controlName: string;
  @Input() minLength: number;

  get requiredError() {
    return this.control.hasError('required') && this.control.touched;
  }

  get minLengthError() {
    return this.control.hasError('minlength') && this.control.touched;
  }

  get usernameExits() {
    return this.control.hasError('usernameExits') && this.control.touched;
  }

  get invalidEmail() {
    return this.control.hasError('email') && this.control.touched;
  }
}
