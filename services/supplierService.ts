// import axios from "axios";
// import { Supplier } from "../types/supplier";
// const API_URL = "http://localhost:5000/api/suppliers";

// export const createSupplier = async (supplier: Supplier): Promise<Supplier> => {
//   const response = await axios.post(API_URL, supplier);
//   return response.data;
// };

// export const getSuppliers = async (): Promise<Supplier[]> => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// export const getSupplierById = async (id: string): Promise<Supplier> => {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
// };

// export const updateSupplier = async (
//     id: string,
//     supplier: Supplier,
// ): Promise<Supplier> => {
//     const response = await axios.put(`${API_URL}/${id}`, supplier);
//     return response.data;
// };

// export const deleteSupplier = async (id: string): Promise<void> => {   
//     const response = await axios.delete(`${API_URL}/${id}`);
// };


