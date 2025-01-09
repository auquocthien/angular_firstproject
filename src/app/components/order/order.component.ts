import { Component } from '@angular/core';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ShippingDetailComponent } from './components/shipping-detail/shipping-detail.component';

@Component({
  selector: 'app-order',
  imports: [OrderSummaryComponent, ShippingDetailComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {}
