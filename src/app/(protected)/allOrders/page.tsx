"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUserOrders } from "@/services/order.service";
import { IOrder } from "@/interface/allOrders.interface";

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const res = await getUserOrders();
      if (res.success && res.data) {
        setOrders(res.data || []);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-8">My Orders</h2>
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm bg-white p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <h3 className="font-semibold text-lg">Order #{order._id}</h3>
                {order.createdAt && (
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} -{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    order.isDelivered
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              {order.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <Image
                    src={item.product.imageCover || "/placeholder.png"}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain bg-gray-50 rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 line-clamp-1">
                      {item.product.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.count}
                    </p>
                  </div>
                  <div className="text-right font-semibold text-red-600">
                    {item.price} EGP
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600">Total Price</span>
              <span className="text-lg font-bold text-gray-900">
                {order.totalOrderPrice} EGP
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
