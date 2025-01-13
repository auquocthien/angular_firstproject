import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { OrderDetail, OrderStatus, PaymentMethod } from '../model/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orderSubject$: BehaviorSubject<OrderDetail[]>;
  orders: Observable<OrderDetail[]>;

  sampleOrder = of<OrderDetail>({
    orderId: '1a74b767-2f80-48f3-bbcc-05f893bd2301',
    items: [
      {
        id: '1',
        imageUrl: 'https://picsum.photos/id/1/5000/3333',
        price: 4,
        quantity: 1,
        createAt: new Date('2025-01-01T03:00:00.000Z'),
      },
      {
        id: '0',
        imageUrl: 'https://picsum.photos/id/0/5000/3333',
        price: 86,
        quantity: 1,
        createAt: new Date('2025-01-01T03:00:00.000Z'),
      },
      {
        id: '2',
        imageUrl: 'https://picsum.photos/id/2/5000/3333',
        price: 15,
        quantity: 1,
        createAt: new Date('2025-01-01T03:00:00.000Z'),
      },
    ],
    createAt: new Date('2025-01-10T14:24:13.324Z'),
    updatedAt: new Date('2025-01-10T14:24:13.324Z'),
    totalAmount: 105,
    status: OrderStatus.PENDING,
    payment: {
      method: PaymentMethod.CARD,
      detail: {
        cardType: 'mastercard',
        cardHolder: 'thien',
        cardNumber: '1234 1234 1234 1234',
        expiryDate: '12/12',
        cvv: '1234',
      },
    },
    receiver: {
      name: 'Âu Quốc Thiện',
      phone: '0867923813',
      address: {
        street: 'Hiếu Phụng',
        suite: '999',
        city: 'Vĩnh Long',
        zipcode: '900',
        geo: {
          lat: 100507,
          long: 1060706,
        },
      },
    },
  });
}
