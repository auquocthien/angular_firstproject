import { Component, ViewChild } from '@angular/core';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ShippingDetailComponent } from './components/shipping-detail/shipping-detail.component';
import {
  OrderDetail,
  OrderReceiver,
  OrderStatus,
} from '../../model/order.model';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [OrderSummaryComponent, ShippingDetailComponent],
  templateUrl: './order-review.component.html',
  styleUrl: './order-review.component.scss',
})
export class OrderReviewComponent {
  @ViewChild('orderSummary') orderSummaryCo: OrderSummaryComponent;
  @ViewChild('shippingDetail') shippingDetailCo: ShippingDetailComponent;

  constructor(private router: Router) {}

  createOrder(receiver: OrderReceiver) {
    const order: OrderDetail = {
      orderId: uuidv4(),
      items: this.orderSummaryCo.cartItem,
      createAt: new Date(),
      updatedAt: new Date(),
      totalAmount: this.orderSummaryCo.totalAmount,
      status: OrderStatus.PENDING,
      payment: this.shippingDetailCo.payment,
      receiver: receiver,
      note: this.shippingDetailCo.note,
    };

    console.log(order);
    this.router.navigate(['/order/detail', order.orderId]);
  }
}
