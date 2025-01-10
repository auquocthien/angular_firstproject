import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Payment, PaymentMethod } from '../../model/order.model';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-edit-card-info',
  imports: [ReactiveFormsModule, UpperCasePipe],
  templateUrl: './edit-card-info.component.html',
  styleUrl: './edit-card-info.component.scss',
})
export class EditCardInfoComponent implements OnInit {
  cardInfo!: FormGroup;
  @Input() cardType: string;
  @Output() emitCardInfo: EventEmitter<Payment> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cardInfo = this.fb.group({
      cardHolder: ['', [Validators.required]],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13,19}$')],
      ],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  onButtonClick() {
    if (this.cardInfo.valid) {
      const card: Payment = {
        method: PaymentMethod.CARD,
        detail: {
          cardType: this.cardType,
          ...this.cardInfo.value,
        },
      };

      this.emitCardInfo.emit(card);
    } else {
      console.log(this.cardInfo);
    }
  }

  transformCardNumber() {
    let currentCardNumber: string = this.cardInfo.get('cardNumber')?.value;
    if (currentCardNumber.length == 4) {
      currentCardNumber = currentCardNumber + ' ';
    } else {
      currentCardNumber = currentCardNumber
        .split(' ')
        .map((seg) => {
          if (seg.length == 4) {
            return (seg += ' ');
          }
          return seg;
        })
        .join('');
    }
    if (currentCardNumber.length == 20) {
      currentCardNumber = currentCardNumber.trim();
    }
    console.log(currentCardNumber.length);
    this.cardInfo.controls['cardNumber'].setValue(currentCardNumber);
  }

  transformExpiryDate() {
    let currentExpiryDate: string = this.cardInfo.get('expiryDate')?.value;
    if (currentExpiryDate.length == 2) {
      currentExpiryDate = currentExpiryDate + '/';
    }
    this.cardInfo.controls['expiryDate'].setValue(currentExpiryDate);
  }
}
