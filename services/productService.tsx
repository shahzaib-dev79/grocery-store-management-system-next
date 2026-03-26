// import axios from "axios";
// import { Product } from "../types/product";

// const API_URL = "http://localhost:5000/api/products";

// export const createProduct = async (product: Product): Promise<Product> => {
//   const response = await axios.post(API_URL, product);
//   return response.data;
// };

// export const getProducts = async (): Promise<Product[]> => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// export const getProductById = async (id: string): Promise<Product> => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

// export const updateProduct = async (
//   id: string,
//   product: Product,
// ): Promise<Product> => {
//   const response = await axios.put(`${API_URL}/${id}`, product);
//   return response.data;
// };

// export const deleteProduct = async (id: string): Promise<void> => {
//   await axios.delete(`${API_URL}/${id}`);
// };
