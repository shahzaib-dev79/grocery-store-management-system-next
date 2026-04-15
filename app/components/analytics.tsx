"use client";

import { useEffect, useState } from "react";
import http from "@/services/http";
import axios from "axios";

import { OrderByDayChart, TopProductsChart, OrderTrendChart } from "./charts";

type Analytics = {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  totalStock: number;
  totalSuppliers: number;
  topSellingProducts: {
    name: string;
    sold: number;
  }[];
  ordersTrend: {
    _id: string;
    totalOrders: number;
  }[];
  ordersByDay: {
    _id: string;
    totalOrders: number;
    totalRevenue: number;
  }[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics>({
    totalOrders: 0,
    totalRevenue: 0,
    topSellingProducts: [],
    totalUsers: 0,
    totalProducts: 0,
    totalStock: 0,
    totalSuppliers: 0,
    ordersByDay: [],
    ordersTrend: [],
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
  if (error) return <p className="p-6 text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6">
      <h2 className="font-bold mb-4 text-2xl">Analytics Stats</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { title: "Total Orders", value: data.totalOrders },
          { title: "Revenue", value: `Rs. ${data.totalRevenue}` },
          { title: "Users", value: data.totalUsers },
          { title: "Products", value: data.totalProducts },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/80 backdrop-blur border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>

            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-2/3"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Revenue Trend</h3>
            <span className="text-green-500 text-sm">Live</span>
          </div>
          <OrderByDayChart data={data.ordersByDay} />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-medium mb-4">Orders Trend</h3>
          <OrderTrendChart data={data.ordersTrend} />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm md:col-span-1">
          <h3 className="font-medium mb-4">Top Selling Products</h3>
          <TopProductsChart data={data.topSellingProducts} />
        </div>
      </div>
    </div>
  );
}
