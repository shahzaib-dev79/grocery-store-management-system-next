import http from "../services/http";
import { wishListItem, wishListResponse, addWishListResponse } from "@/types/wishList";





export const addToWishlist = async (productId: string) => {
  const response = await http.post<addWishListResponse>("/wishlist", {
    productId,
  });

  return response.data;
};



export const getWishlist = async () => {
  const response = await http.get<wishListResponse>("/wishlist");

  return response.data;
};



export const removeFromWishlist = async (id: string) => {
  const response = await http.delete(`/wishlist/${id}`);

  return response.data;
};



export const clearWishlist = async () => {
  const response = await http.delete("/wishlist/clear");

  return response.data;
};