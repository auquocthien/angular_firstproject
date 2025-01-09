export interface CartItem {
  id: string;
  imageUrl: string;
  quantity: number;
  price: number;
  createAt?: Date;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

export interface FilteredList {
  key: string;
  items: CartItem[];
}
