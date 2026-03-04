export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
}

export interface CartItem {
  _id: string;
  product: Product | string;
  name: string;
  proce: number;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
