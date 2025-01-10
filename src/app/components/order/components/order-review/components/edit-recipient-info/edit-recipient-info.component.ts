import { NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUserInfo } from '../../../../../../../shared/models/user.model';

@Component({
  selector: 'app-edit-recipient-info',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-recipient-info.component.html',
  styleUrl: './edit-recipient-info.component.scss',
})
export class EditRecipientInfoComponent implements OnInit {
  receiverForm!: FormGroup;
  @Input() defaultReceiver: IUserInfo;
  @Output() emitNewReceiver: EventEmitter<IUserInfo> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.receiverForm = this.fb.group({
      name: ['', [Validators.required]],

      phone: ['', [Validators.required, Validators.maxLength(10)]],
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
    });
  }

  onButtonClick() {
    if (this.receiverForm.valid) {
      this.emitNewReceiver.emit(this.receiverForm.value);
    }
  }
}
