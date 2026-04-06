"use client";

import { useEffect, useState } from "react";
import http from "@/services/http";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Order = {
  _id: string;
  customerName: string;
  items: {
    productName: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await http.get("/orders/all");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdate = (order: Order) => {
    router.push(`/admin/orders/add?id=${order._id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await http.delete(`/orders/delete/${id}`);
      setToast("Order deleted successfully ✅");
      fetchOrders();

      setTimeout(() => setToast(""), 3000);
    } catch {
      setToast("Delete failed ");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto">
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded">
          {toast}
        </div>
      )}

      <button
        onClick={() => router.push("/admin")}
        className="bg-gray-200 px-4 py-2 rounded mb-5 "
      >
        <ArrowLeft size={18} />
      </button>

      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/admin/orders/add")}
          className="bg-green-700 text-white px-4 py-2 rounded mb-3"
        >
          Create Order
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Customer Name</th>
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{order.customerName}</td>

              <td className="p-2">{order.items[0]?.productName || "N/A"}</td>

              <td className="p-2">{order.items[0]?.quantity || 0}</td>

              <td className="p-2">Rs. {order.totalAmount}</td>

              <td className="p-2">{order.status}</td>

              <td className="p-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => handleUpdate(order)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <p className="p-4 text-center text-gray-500">No orders found</p>
      )}
    </div>
  );
}
