import http from "./http"; 
import { Order } from "../types/order"; 

const orderService = {
  //for creating a new order
  createOrder: async (orderData: Order) => {
    const response = await http.post("/orders/create", orderData);
    return response.data;
  },

  // for getting all orders 
  getAllOrders: async () => {
    const response = await http.get("/orders/all");
    return response.data;
  },

  // for getting a single order by ID
  getSingleOrder: async (id: string) => {
    const response = await http.get(`/orders/${id}`);
    return response.data;
  },

 //for canceling an order
  cancelOrder: async (id: string) => {
    const response = await http.patch(`/orders/cancel/${id}`);
    return response.data;
  },

// for deleting an order
  deleteOrder: async (id: string) => {
    const response = await http.delete(`/orders/delete/${id}`);
    return response.data;
  }
};

export default orderService;