import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem, FilteredList } from './model/cart.model';
import { Store } from '@ngrx/store';
import * as AppStore from '../../store/reducer';
import { CartService } from './services/cart.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CurrencyPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HoverButtonDirective } from '../../../shared/directives/hover-button.directive';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { IUser } from '../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [
    CartItemComponent,
    NgFor,
    FormsModule,
    NgIf,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, AfterViewInit {
  cart: Cart;
  originCart: CartItem[];
  isSelectAll: boolean = false;
  isDisplayDeleteButton: boolean = false;
  condition: string = 'none';
  amountOfSelectItem: number = 0;
  filteredList: FilteredList[] = [];
  user: IUser;

  @ViewChildren(CartItemComponent) cartItemCo: QueryList<CartItemComponent>;

  constructor(
    private store: Store,
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });

    this.store.select(AppStore.selectUser).subscribe((user) => {
      this.user = user;
    });
    // this.cart = {
    //   id: 'cart1',
    //   items: [
    //     {
    //       id: '1',
    //       quantity: 2,
    //       price: 100,
    //       createAt: new Date('2025-01-01T10:00:00'),
    //     },
    //     {
    //       id: '2',
    //       quantity: 1,
    //       price: 200,
    //       createAt: new Date('2025-01-01T11:00:00'),
    //     },
    //     {
    //       id: '3',
    //       quantity: 3,
    //       price: 50,
    //       createAt: new Date('2025-01-03T12:00:00'),
    //     },
    //     {
    //       id: '4',
    //       quantity: 5,
    //       price: 20,
    //       createAt: new Date('2025-01-04T13:00:00'),
    //     },
    //     {
    //       id: '5',
    //       quantity: 3,
    //       price: 50,
    //       createAt: new Date('2025-01-04T12:00:00'),
    //     },
    //     {
    //       id: '6',
    //       quantity: 5,
    //       price: 20,
    //       createAt: new Date('2025-01-05T13:00:00'),
    //     },
    //   ],
    //   totalAmount: 650,
    //   totalQuantity: 11,
    // };

    this.originCart = [...this.cart.items];
  }

  ngAfterViewInit(): void {
    this.cartItemCo.forEach((item) => console.log(item));
    console.log(this.originCart);
  }

  onSelectAllItem() {
    this.cartItemCo.forEach((item) => {
      item.isSelected = !this.isSelectAll;
      console.log(item.isSelected);
    });
    this.isSelectAll = !this.isSelectAll;
    this.isDisplayDeleteButton = this.isSelectAll ? true : false;

    this.calculateCartAmount();
  }

  toggleSelectAll(status: boolean) {
    this.isSelectAll = this.cartItemCo
      .toArray()
      .every((cartItem) => cartItem.isSelected);

    this.isDisplayDeleteButton = this.cartItemCo
      .toArray()
      .some((cartItem) => cartItem.isSelected);
    this.calculateCartAmount();
    this.cd.detectChanges();
  }

  deleteCartItem() {
    const deleteItems: CartItem[] = [];

    this.cartItemCo.forEach((i) => {
      if (i.isSelected) {
        deleteItems.push(i.item);
      }
    });

    this.cartService.deleteCartItems(deleteItems);
    this.isDisplayDeleteButton = false;
    this.isSelectAll = false;
    this.calculateCartAmount();
  }

  filterByCondition(condition: string) {
    this.filteredList = [];
    let currentKey = null;

    this.cart.items.forEach((item) => {
      if (item.hasOwnProperty(condition)) {
        var itemKey = item[condition];

        if (itemKey instanceof Date) {
          itemKey = itemKey.toLocaleDateString();
          console.log(itemKey);
        }

        if (itemKey != currentKey) {
          currentKey = itemKey;
          this.filteredList.push({
            key: currentKey,
            items: [item],
          });
        } else {
          const exitsGroup = this.filteredList.find((i) => i.key == currentKey);
          if (exitsGroup) {
            exitsGroup.items.push(item);
          }
        }
      }
    });
  }

  filterCartItem() {
    switch (this.condition) {
      case 'none':
        this.cart.items = this.originCart;
        break;
      case 'price':
        this.cart.items = this.cart.items.sort((a, b) => a.price - b.price);
        break;
      case 'date':
        this.filterByCondition('createAt');
        break;
      case 'author':
        this.filterByCondition('author');
        break;
    }
    console.log(this.filteredList);
    this.cd.detectChanges();
  }

  calculateCartAmount() {
    this.amountOfSelectItem = 0;
    const selectedItem = this.cartItemCo.filter((item) => item.isSelected);
    this.amountOfSelectItem = selectedItem.reduce(
      (totalAmount, current) =>
        (totalAmount += current.itemQuantity * current.item.price),
      0
    );
  }

  trackByItem(index: number, item: CartItem): string {
    return item.id;
  }

  redirectToOrderPage() {
    const selectItem = this.cartItemCo
      .map((itemCo) => {
        if (itemCo.isSelected) {
          return itemCo.item;
        }
        return null;
      })
      .filter((item) => item !== null);
    this.cartService.setSelectedItem(selectItem);
    this.router.navigate(['/order']);
  }
}
