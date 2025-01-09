import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Payment, PaymentMethod } from '../../model/order.model';

@Component({
  selector: 'app-edit-card-info',
  imports: [ReactiveFormsModule],
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

      console.log(card);

      this.emitCardInfo.emit(card);
    } else {
      console.log(this.cardInfo);
    }
  }
}
