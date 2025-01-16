import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  AddressType,
  IUserProfile,
} from '../../../../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import {
  OrderDetail,
  OrderReceiver,
  Payment,
  PaymentMethod,
} from '../../../../model/order.model';
import { NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import {
  faCcMastercard,
  faCcVisa,
  faCcAmex,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons';
import { EditRecipientInfoComponent } from '../edit-recipient-info/edit-recipient-info.component';
import { EditCardInfoComponent } from '../edit-card-info/edit-card-info.component';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import * as AppStore from '../../../../../../store/reducer';

@Component({
  selector: 'app-shipping-detail',
  imports: [
    NgIf,
    NgClass,
    FontAwesomeModule,
    EditRecipientInfoComponent,
    EditCardInfoComponent,
    FormsModule,
  ],
  templateUrl: './shipping-detail.component.html',
  styleUrl: './shipping-detail.component.scss',
})
export class ShippingDetailComponent implements OnInit {
  @Output() createOrderEmitter: EventEmitter<OrderReceiver> =
    new EventEmitter();
  note: string;
  receiver: OrderReceiver;

  selectedCardType: string = 'cash';
  payment: Payment;

  showEditInfo: boolean = false;
  showCardInfo: boolean = false;
  showModal: boolean = false;
  closeIcon = faClose;
  cash = faMoneyBill1;
  brandIcon = {
    mastercard: faCcMastercard,
    visa: faCcVisa,
    amex: faCcAmex,
    paypal: faCcPaypal,
  };

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.store.select(AppStore.selectUser).subscribe((user) => {
      const profile = user.profile;

      this.receiver = {
        name: profile.fullName,
        phone: profile.phone,
        address: profile.address[0],
      };
    });
  }

  getUserInfo(): string {
    const { phone, address } = this.receiver;
    return `${phone}, ${address.street}, ${address.suite}, ${address.city}`;
  }

  showEditModal(
    showEditInfo: boolean,
    showCardInfo: boolean,
    cardType?: string
  ): void {
    this.showModal = !this.showModal;

    this.showEditInfo = showEditInfo;
    this.showCardInfo = showCardInfo;
    this.selectedCardType = cardType;
  }

  onSelectCash() {
    this.payment.method = PaymentMethod.CASH;
    this.selectedCardType = 'cash';
  }

  updateReceiver(newReceiver: OrderReceiver) {
    this.showModal = false;
    this.showEditInfo = false;

    if (newReceiver) {
      this.receiver = newReceiver;
    }
  }

  updateCardInfo(cardDetail: Payment) {
    this.showModal = false;
    this.showCardInfo = false;

    if (cardDetail) {
      this.selectedCardType = cardDetail.detail.cardType;
      this.payment = cardDetail;

      console.log(this.selectedCardType);
    }
  }

  getSelectedCardStyle(cardType: string) {
    return this.selectedCardType === cardType
      ? {
          border: true,
          'border-success': true,
          'shadow-sm': true,
          'border-2': true,
          rounded: true,
        }
      : {
          border: false,
          'border-success': false,
          'shadow-sm': false,
          'border-2': false,
          rounded: false,
        };
  }

  createOrder() {
    this.createOrderEmitter.emit(this.receiver);
  }
}
