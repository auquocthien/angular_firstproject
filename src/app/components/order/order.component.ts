import { Component, ViewChild } from '@angular/core';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ShippingDetailComponent } from './components/shipping-detail/shipping-detail.component';
import { OrderDetail, OrderStatus } from './model/order.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order',
  imports: [OrderSummaryComponent, ShippingDetailComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @ViewChild('orderSummary') orderSummaryCo: OrderSummaryComponent;
  @ViewChild('shippingDetail') shippingDetailCo: ShippingDetailComponent;

  constructor() {}
  createOrder(event: boolean) {
    if (event) {
      const order: OrderDetail = {
        orderId: uuidv4(),
        items: this.orderSummaryCo.cartItem,
        createAt: new Date(),
        updatedAt: new Date(),
        totalAmount: this.orderSummaryCo.totalAmount,
        status: OrderStatus.PENDING,
        payment: this.shippingDetailCo.payment,
        receiver: this.shippingDetailCo.userInfo,
        note: this.shippingDetailCo.note,
      };

      console.log(order);
    }
  }
}
