import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';
import { AuthService } from '../../../shared/services/auth.service';
import { AddressFormComponent } from '../../../shared/components/address-form/address-form/address-form.component';
import { catchError, map } from 'rxjs';
import { transformUserInfo } from '../../../shared/helper/transform-user-info';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import {
  IAddress,
  IUserAccount,
  IUserProfile,
} from '../../../shared/models/user.model';
// import { CustomAsyncValidators } from '../../../shared/validators/async-validators.validators';

@Component({
  selector: 'app-add-user-form',
  imports: [
    UpperCasePipe,
    NgIf,
    ReactiveFormsModule,
    FormErrorComponent,
    AddressFormComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  accountForm: FormGroup;
  step: number = 3;
  showPasswordError: boolean = false;

  @ViewChild('addressForm') addressFormCo: AddressFormComponent;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private localService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullname: [null, [Validators.required]],
      username: [
        '',
        [Validators.required, Validators.minLength(5)],
        // [CustomAsyncValidators.checkUsername(this.AuthService)],
      ],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
    });

    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      retryPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  checkConfirmPassword() {
    const password = this.accountForm.get('password').value.trim();
    const retryPassword = this.accountForm.get('retryPassword').value.trim();

    if (password.length === retryPassword.length) {
      this.showPasswordError = password !== retryPassword;
    } else {
      this.showPasswordError = true;
    }
  }

  updateStep(step: string) {
    if (step == 'increase') {
      this.step += 1;
    } else {
      this.step -= 1;
    }
  }

  signup() {
    if (this.accountForm.valid && !this.showPasswordError) {
      const email = this.accountForm.get('email').value;
      const password = this.accountForm.get('password').value;
      this.authService.signup(email, password).subscribe((res) => {
        if (res) {
          console.log(res);
          this.step += 1;
        }
      });
    }
  }

  createUserProfile() {
    if (this.userForm.valid && this.addressFormCo.addressForm.valid) {
      const uuid = this.localService.getItem('uuid');
      const address: IAddress = this.addressFormCo.addressForm.value;
      const account: IUserAccount = this.accountForm.value;
      const profile: IUserProfile = {
        ...this.userForm.value,
        address: address,
      };
      this.authService
        .createUserProfile(uuid, {
          account: account,
          profile: profile,
        })
        .subscribe();
    }
  }
}
