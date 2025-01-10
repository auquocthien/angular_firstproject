import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { IUserInfo } from '../../../../../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import {
  OrderDetail,
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
  @Output() createOrderEmitter: EventEmitter<boolean> = new EventEmitter();
  userInfo: IUserInfo;
  note: string;

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
    // this.store.select(AppStore.selectUser).subscribe((user) => {
    //   this.userInfo = user.userInfo;
    // });
    this.userInfo = {
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: -37.3159,
          long: 81.1496,
        },
      },

      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-market',
      },
    };
  }

  getUserInfo(): string {
    const { phone, address } = this.userInfo;
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

  updateReceiver(newReceiver: IUserInfo) {
    this.showModal = false;
    this.showEditInfo = false;

    if (newReceiver) {
      this.userInfo = newReceiver;
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
    this.createOrderEmitter.emit(true);
  }
}
