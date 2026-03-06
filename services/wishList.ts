import http from "../services/http";
import {
  wishListResponse,
  addWishListResponse,
} from "@/types/wishList";

export const addToWishlist = async (
  productId: string
): Promise<addWishListResponse> => {
  const { data } = await http.post<addWishListResponse>("/wishlist", {
    productId,
  });

  return data;
};

export const getWishlist = async (): Promise<wishListResponse> => {
  const { data } = await http.get<wishListResponse>("/wishlist");

  return data;
};

export const removeFromWishlist = async (id: string): Promise<void> => {
  await http.delete(`/wishlist/${id}`);
};

export const clearWishlist = async (): Promise<void> => {
  await http.delete("/wishlist/clear");
};