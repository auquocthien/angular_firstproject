import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from './model/cart.model';
import { Store } from '@ngrx/store';
import * as AppStore from '../../store/reducer';
import { CartService } from './services/cart.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoverButtonDirective } from '../../../shared/directives/hover-button.directive';

@Component({
  selector: 'app-order',
  imports: [CartItemComponent, NgFor, FormsModule, NgIf, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, AfterViewInit {
  cart: Cart;
  originCart: CartItem[];
  isSelectAll: boolean = false;
  isDisplayDeleteButton: boolean = false;
  condition: string = 'none';

  @ViewChildren(CartItemComponent) cartIemCo: QueryList<CartItemComponent>;

  constructor(
    private store: Store,
    private cartService: CartService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.cartService.cart$.subscribe((cart) => {
    //   this.cart = cart;
    // });
    this.cart = {
      id: 'cart1',
      items: [
        { id: '1', quantity: 2, price: 100 },
        { id: '2', quantity: 1, price: 200 },
        { id: '3', quantity: 3, price: 50 },
        { id: '4', quantity: 5, price: 20 },
      ],
      totalAmount: 650,
      totalQuantity: 11,
    };

    this.originCart = this.cart.items;
  }

  ngAfterViewInit(): void {
    this.cartIemCo.forEach((item) => console.log(item));
  }

  onSelectAllItem() {
    this.cartIemCo.forEach((item) => {
      item.isSelected = !this.isSelectAll;
    });
    this.isSelectAll = !this.isSelectAll;
    this.isDisplayDeleteButton = this.isSelectAll ? true : false;
  }

  toggleSelectAll(status: boolean) {
    this.isSelectAll = this.cartIemCo
      .toArray()
      .every((cartItem) => cartItem.isSelected);

    this.isDisplayDeleteButton = this.cartIemCo
      .toArray()
      .some((cartItem) => cartItem.isSelected);
    this.cd.detectChanges();
  }

  deleteCartItem() {
    const deleteItems: CartItem[] = [];

    this.cartIemCo.forEach((i) => {
      if (i.isSelected) {
        deleteItems.push(i.item);
      }
    });

    this.cartService.deleteCartItems(deleteItems);
    this.isDisplayDeleteButton = false;
    this.isSelectAll = false;
  }

  filterCartItem() {
    switch (this.condition) {
      case 'price': {
        this.cart.items = this.cart.items.sort((a, b) => a.price - b.price);
        break;
      }
      default: {
        this.cart.items = this.originCart;
      }
    }
  }
}
