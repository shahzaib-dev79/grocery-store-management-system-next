"use client";

import { useEffect, useState } from "react";
import http from "@/services/http";
import axios from "axios";
import { useRouter } from "next/navigation";

type Order = {
  _id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await http.get("/orders/all");
      setOrders(res.data.orders || []);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.msg || err.message
        : "Error fetching orders";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await http.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="p-6 text-center">Loading orders...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/orders/add")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900 "
        >
          + Create Order
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">
                    Rs. {order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "processed"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => updateStatus(order._id, "processed")}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Process
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Deliver
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "cancelled")}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <p className="p-4 text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
}
