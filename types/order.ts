
export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;           
  customerId: string;      
  customerName: string;
  items: OrderItem[];      
  totalAmount: number;
  status: "pending" | "processed" | "delivered" | "cancelled";
  createdAt?: string;     
  updatedAt?: string;
}