"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import http from "@/services/http";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export default function OrderAddPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState<OrderItem[]>([
    { productId: "", productName: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [status, setStatus] = useState<
    "pending" | "processed" | "delivered" | "cancelled"
  >("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = items.reduce((sum, i) => sum + i.total, 0);
  const fetchProducts = async () => {
    try {
      const res = await http.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addItem = () => {
    setItems([
      ...items,
      { productId: "", productName: "", quantity: 1, price: 0, total: 0 },
    ]);
  };

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number,
  ) => {
    const updated = [...items];
    const item = updated[index];

    if (field === "productId") {
      const prod = products.find((p) => p._id === value);
      if (prod) {
        item.productId = prod._id;
        item.productName = prod.name;
        item.price = prod.price;
        item.total = prod.price * item.quantity;
      }
    } else if (field === "quantity") {
      item.quantity = Number(value);
      item.total = item.quantity * item.price;
    } else if (field === "price") {
      item.price = Number(value);
      item.total = item.price * item.quantity;
    }

    updated[index] = item;
    setItems(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleCreateOrder = async () => {
    if (!customerName) return alert("Enter customer name");
    if (items.length === 0) return alert("Add at least one product");

    try {
      setLoading(true);
      setError("");

      const res = await http.post("/orders/create", {
        customerName,
        items: items.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          quantity: i.quantity,
          price: i.price,
        })),
        totalAmount,
        status,
      });

      if (res.status === 201) {
        toast.success("Order created successfully!");
        router.push("/admin/orders");
      }
    } catch (err: any) {
      console.log("ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Create Order</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border w-full p-2 rounded"
        />
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-5 gap-2 mb-2 items-end">
          <select
            value={item.productId}
            onChange={(e) => updateItem(idx, "productId", e.target.value)}
            className="border p-2 rounded col-span-2"
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Rs. {p.price})
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) =>
              updateItem(idx, "quantity", Number(e.target.value))
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            min={0}
            value={item.price}
            onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
            className="border p-2 rounded"
          />

          {items.length > 1 && (
            <button
              onClick={() => removeItem(idx)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          )}
        </div>
      ))}

      <button onClick={addItem} className="bg-gray-300 px-3 py-1 rounded mb-4">
        + Add Item
      </button>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="border w-full p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="processed">Processed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mb-4 text-right font-semibold text-lg">
        Total: Rs. {totalAmount.toLocaleString()} //total amount
      </div>

      <button
        onClick={handleCreateOrder}
        disabled={loading}
        className="bg-green-700 text-white px-6 py-2 rounded w-full hover:bg-green-900"
      >
        {loading ? "Creating..." : "Create Order"}
      </button>
    </div>
  );
}
