import { Component } from '@angular/core';
import { CartItem } from '../../../cart/model/cart.model';
import { CartService } from '../../../cart/services/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [NgFor, CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  cartItem: CartItem[];
  totalAmount: number;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItem = cartService.getSelectedItem();
    this.totalAmount = this.cartItem.reduce(
      (total, current) => (total += current.quantity * current.price),
      0
    );
    console.log(this.cartItem);
  }

  toImageDetail(id: string) {
    this.router.navigate(['images/image', id]);
  }
}
