export interface CartItem {
  id: string;
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
