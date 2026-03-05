import http from "./http";
import { Cart } from "../types/cart";

export const addToCart = async (productId: string, quantity: number = 1) => {
  const response = await http.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const getCart = async () => {
  const response = await http.get<{ success: boolean; cart: Cart }>("/cart");
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await http.put("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await http.delete("/cart/item", {
    data: { productId },
  });

  return response.data;
};

export const clearCart = async () => {
  const response = await http.put("/cart/clear");
  return response.data;
};
