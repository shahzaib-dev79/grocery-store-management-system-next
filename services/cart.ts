import http from "./http";
import { Cart, CartResponse } from "../types/cart";

export const addToCart = async (productId: string, quantity: number = 1) => {
  const response = await http.post<CartResponse>("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const getCart = async () => {
  const response = await http.get<CartResponse>("/cart");
  return response.data;
};

export const updateCartItem = async (productId: string, quantity: number) => {
  const response = await http.put<CartResponse>("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await http.delete<CartResponse>("/cart/item", {
    data: { productId },
  });

  return response.data;
};

export const clearCart = async () => {
  const response = await http.put<CartResponse>("/cart/clear");
  return response.data;
};
