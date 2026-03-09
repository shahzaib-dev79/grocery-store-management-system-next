import http from "./http";
import { Inventory } from "../types/inventory";

export const createInventory = async (data: {
  productName: string;
  quantity: number;
  price: number;
  supplier?: string;
}) => {
  const response = await http.post("/inventory", data);
  return response.data;
};

export const getAllInventory = async () => {
  const response = await http.get<Inventory[]>("/inventory");
  return response.data;
};

export const updateInventory = async (id: string, data: Partial<Inventory>) => {
  const response = await http.put(`/inventory/${id}`, data);
  return response.data;
};

export const deleteInventory = async (id: string) => {
  const response = await http.delete<{ message: string }>(`/inventory/${id}`);
  return response.data;
};
