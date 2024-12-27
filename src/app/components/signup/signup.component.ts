import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';
import { UserService } from '../../../shared/services/user.service';
import { CustomAsyncValidators } from '../../../shared/validators/async-validators.validators';

@Component({
  selector: 'app-add-user-form',
  imports: [
    UpperCasePipe,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    FormErrorComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      username: [
        '',
        [Validators.required, Validators.minLength(5)],
        [CustomAsyncValidators.checkUsername(this.userService)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      website: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required],
        geo: this.fb.group({
          lat: 111111,
          long: 111111,
        }),
      }),
      company: this.fb.group({
        name: ['', Validators.required],
        catchPhrase: ['', Validators.required],
        bs: this.fb.array([this.fb.control('', [Validators.required])]),
      }),
    });
  }

  get co_bs() {
    return this.userForm.get('company.bs') as FormArray;
  }

  addCo_bs() {
    this.co_bs.push(this.fb.control('', [Validators.required]));
  }

  deleteCo_bs(index: number) {
    this.co_bs.removeAt(index);
  }

  submitForm() {
    console.log(this.userForm.get('username'));
  }
}
