import {
  IAddress,
  IGeo,
  IUserInfo,
} from '../../../../shared/models/user.model';
import { CartItem } from '../../cart/model/cart.model';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}

export interface Payment {
  method: PaymentMethod;
  detail?: {
    cardHolder: string;
    cardType: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export enum OrderStatus {
  PENDING = 'pending',
  PICKED_UP = 'picked_up',
  TRANSPORT = 'transport',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

export interface OrderReceiver {
  name: string;
  phone: string;
  address: IAddress;
}

export interface OrderDetail {
  orderId: string;
  items: CartItem[];
  createAt: Date;
  updatedAt: Date;
  totalAmount: number;
  status: OrderStatus;
  payment: Payment;
  note?: string;
  estimatedDeliveryDate?: Date;
  receiver: IUserInfo | OrderReceiver;
}
