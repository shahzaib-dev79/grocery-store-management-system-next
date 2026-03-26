"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {Order} from "@/types/order";
export default function OrderTrackingPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/user/orders");
            setOrders(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div className="p-6">
            <Toaster position="top-right" />
            <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
            {loading && <p>Loading orders...</p>}
            {!loading && orders.length === 0 && (
                <p>No orders found</p>
            )}
            {!loading && orders.map((order) => (
                <div key={order._id} className="border p-4 mb-4 rounded shadow">
                    <h3 className="font-semibold">Customer: {order.customerName}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                    <p className="mt-2">Status: {""} <span className="font-bold text-blue-600">{order.status}</span></p>
                    <p>Total amount:${order.totalAmount}</p>
                    <div className="mt-2">
                        <h4 className="font-semibold">Order Items:</h4>
                        {order.items.map((item, index)=>(
                            <p key={index} className="text-sm">
                                {item.productName} x {item.quantity} (${item.price})
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
