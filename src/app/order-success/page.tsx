"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Package, Truck, MoveRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const latestOrder = localStorage.getItem("shoptimizer_latest_order");
    if (latestOrder) {
      setOrder(JSON.parse(latestOrder));
    }
  }, []);

  if (!order) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-shopOrange"></div>
      <p className="text-shopMuted text-sm">Verifying your order...</p>
    </div>
  );

  return (
    <div className="w-full bg-shopGray min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">

        {/* Success Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-100">
            <CheckCircle2 className="w-8 h-8 text-shopGreen" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-shopDark mb-1">
              Order Placed! 🎉
            </h1>
            <p className="text-shopMuted text-sm">
              Thank you, {order.shippingDetails.name}! Your order has been received.
            </p>
          </div>
        </div>

        {/* Order ID Card */}
        <div className="bg-white rounded-xl border border-shopBorder p-4 mb-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-shopMuted uppercase tracking-wider">Order ID</p>
            <p className="text-base font-bold text-shopOrange">{order.orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-shopMuted uppercase tracking-wider">Total</p>
            <p className="text-base font-bold text-shopDark">৳{order.totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="bg-white rounded-xl border border-shopBorder p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="w-4 h-4 text-shopOrange" />
            <h4 className="text-xs font-bold text-shopDark uppercase tracking-wider">Shipping To</h4>
          </div>
          <p className="text-sm font-semibold text-shopDark">{order.shippingDetails.name}</p>
          <p className="text-xs text-shopMuted mt-0.5">{order.shippingDetails.phone}</p>
          <p className="text-xs text-shopMuted mt-1 leading-relaxed">
            {order.shippingDetails.address}, {order.shippingDetails.thana}, {order.shippingDetails.district}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl border border-shopBorder p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-shopOrange" />
            <h4 className="text-xs font-bold text-shopDark uppercase tracking-wider">Order Items</h4>
          </div>
          <div className="flex flex-col gap-2">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-sm pb-2 border-b border-shopBorder last:border-0 last:pb-0">
                <span className="text-shopText">
                  {item.name}
                  <span className="text-xs text-shopMuted ml-1">x{item.quantity}</span>
                </span>
                <span className="font-semibold text-shopDark">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 mt-1">
              <span className="text-xs text-shopMuted">Shipping Fee</span>
              <span className="text-xs font-medium text-shopDark">৳{order.shippingFee}</span>
            </div>
            <div className="flex justify-between items-center border-t border-shopBorder pt-2">
              <span className="text-sm font-bold text-shopDark">Total</span>
              <span className="text-sm font-bold text-shopOrange">৳{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/track-order?id=${order.orderId}&phone=${order.shippingDetails.phone}`}
            className="w-full flex items-center justify-center gap-2 bg-shopOrange hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-sm transition-all active:scale-[0.98] group"
          >
            <Package className="w-4 h-4" />
            Track Your Order
            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-white border border-shopBorder hover:bg-shopGray text-shopDark py-3 rounded-lg font-semibold text-sm transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <p className="text-center text-xs text-shopMuted mt-6 leading-relaxed">
          Orders are typically processed within 24 hours.
        </p>

      </div>
    </div>
  );
}