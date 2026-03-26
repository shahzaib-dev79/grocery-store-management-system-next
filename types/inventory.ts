export interface Inventory {
  _id: string;
  productName: string;
  quantity: number;
  price: number;
  supplier?: string;
  createdAt: string;
  updatedAt: string;
}
