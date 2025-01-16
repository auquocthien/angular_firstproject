import { Injectable } from '@angular/core';
import { IUserProfile } from '../../../../shared/models/user.model';
import { Cart, CartItem } from '../model/cart.model';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AppStore from '../../../store/reducer';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  cart$: Observable<Cart>;
  selectedItem: CartItem[] = [
    {
      id: '1',
      imageUrl: 'https://picsum.photos/id/1/5000/3333',
      price: 4,
      quantity: 1,
      createAt: new Date('2025-01-01T10:00:00'),
    },

    {
      id: '0',
      imageUrl: 'https://picsum.photos/id/0/5000/3333',
      price: 86,
      quantity: 1,
      createAt: new Date('2025-01-01T10:00:00'),
    },

    {
      id: '2',
      imageUrl: 'https://picsum.photos/id/2/5000/3333',
      price: 15,
      quantity: 1,
      createAt: new Date('2025-01-01T10:00:00'),
    },
  ];

  constructor(private store: Store) {
    this.cartSubject = new BehaviorSubject<Cart>({
      id: uuidv4(),
      items: [],
      totalAmount: 0,
      totalQuantity: 0,
    });

    this.cart$ = this.cartSubject.asObservable();
  }

  get cartItem() {
    return this.cartSubject.value.items;
  }

  private updateCart(items: CartItem[]) {
    const totalQuantity = items.length;
    const totalAmount = items.reduce(
      (totalAmount, current) => totalAmount + current.price * current.quantity,
      0
    );

    const updatedCart: Cart = {
      ...this.cartSubject.value,
      totalAmount,
      totalQuantity,
      items,
    };

    this.cartSubject.next(updatedCart);
  }

  addItem(item: CartItem) {
    const currentItems = [...this.cartSubject.value.items];
    const existingItemIndex = currentItems.findIndex((i) => i.id === item.id);

    if (existingItemIndex === -1) {
      currentItems.push(item);
    } else {
      currentItems[existingItemIndex] = {
        ...currentItems[existingItemIndex],
        quantity: currentItems[existingItemIndex].quantity + item.quantity,
      };
    }
    this.updateCart(currentItems);
  }

  deleteCartItems(items: CartItem[]) {
    const currentItems = [...this.cartSubject.value.items];
    const updatedItem = currentItems.filter(
      (i) => !items.some((deleteItem) => deleteItem.id == i.id)
    );

    this.updateCart(updatedItem);
  }

  changeQuantity(itemId: string, increase: boolean = true) {
    const currentItems = [...this.cartSubject.value.items];
    const updatedItem = currentItems
      .map((i) => {
        if (i.id == itemId) {
          var maxQuantity = 0;
          this.store
            .select(AppStore.selectImageDetail(itemId))
            .subscribe((item) => (maxQuantity = item[0].quantity));

          const newQuantify = i.quantity + (increase ? 1 : -1);
          if (newQuantify > maxQuantity) {
            return { ...i, quantity: maxQuantity };
          }
          return newQuantify > 0 ? { ...i, quantity: newQuantify } : null;
        }
        return i;
      })
      .filter((i) => i !== null) as CartItem[];

    this.updateCart(updatedItem);
  }

  isExitsInCart(id: string): boolean {
    return (
      this.cartSubject.value.items.find((item) => item.id == id) !== undefined
    );
  }

  // removeItem(itemId: string) {
  //   this.cart.items = this.cart.items.filter((item) => item.id != itemId);
  // }

  setSelectedItem(items: CartItem[]) {
    this.selectedItem = items;
  }

  getSelectedItem() {
    return this.selectedItem;
  }
}
