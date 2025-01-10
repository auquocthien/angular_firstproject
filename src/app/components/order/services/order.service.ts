import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderDetail } from '../model/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orderSubject$: BehaviorSubject<OrderDetail[]>;
  orders: Observable<OrderDetail[]>;
}
