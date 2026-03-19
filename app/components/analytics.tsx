"use client";

import { useEffect, useState } from "react";
import http from "@/services/http";
import axios from "axios";

type Analytics = {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  totalStock: number;
  totalSuppliers: number;
};

export default function AnalyticsDashboard() {
  const [data, setData] = useState<Analytics>({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    totalStock: 0,
    totalSuppliers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await http.get("/dashboard");
        setData(res.data);
      } catch (err: unknown) {
        const msg = axios.isAxiosError(err)
          ? err.response?.data?.msg || err.message
          : "Error fetching analytics";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading analytics...</p>;
  if (error) return <p className="text-red-500 p-6 text-center">{error}</p>;

  return (
    <div className="mt-6">
      <h2 className="font-bold mb-4 text-2xl">Analytics Stats</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold">{data.totalOrders}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">
            Rs. {data.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-bold">{data.totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-2xl font-bold">{data.totalProducts}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Stock</h2>
          <p className="text-2xl font-bold">{data.totalStock}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500">Suppliers</h2>
          <p className="text-2xl font-bold">{data.totalSuppliers}</p>
        </div>
      </div>
    </div>
  );
}
