"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Package, Search, MoveLeft, Clock, MapPin, Phone, Truck } from "lucide-react";
import Link from "next/link";
import TrackingTimeline from "@/components/order/TrackingTimeline";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const qId = searchParams.get("id");
    const qPhone = searchParams.get("phone");
    if (qId && qPhone) {
      setOrderId(qId);
      setPhoneNumber(qPhone);
      handleSearch(qId, qPhone);
    }
  }, [searchParams]);

  const handleSearch = async (id: string, phone: string) => {
    setIsSearching(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/track?order_number=${id}&phone=${phone}`,
        { headers: { Accept: "application/json" } }
      );
      const data = await res.json();
      if (!res.ok || !data.order) {
        setError("Order not found. Please check your tracking ID and phone number.");
        setFoundOrder(null);
      } else {
        const order = data.order;
        setFoundOrder({
          orderId: order.order_number,
          status: order.status,
          totalAmount: parseFloat(order.total),
          shippingFee: parseFloat(order.delivery_fee),
          shippingDetails: {
            name: order.customer_name,
            phone: order.customer_phone,
            address: order.address_line,
            thana: order.thana,
            district: order.district,
          },
          items: order.items.map((item: any) => ({
            name: item.product_name,
            quantity: item.quantity,
            price: parseFloat(item.price),
          })),
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setFoundOrder(null);
    } finally {
      setIsSearching(false);
    }
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && phoneNumber) handleSearch(orderId, phoneNumber);
  };

  return (
    <div className="w-full bg-shopGray min-h-screen py-6">
      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <div className="mb-5">
          <Link href="/" className="flex items-center gap-1.5 text-shopMuted hover:text-shopOrange transition-colors text-xs font-medium uppercase tracking-wider mb-3">
            <MoveLeft className="w-3.5 h-3.5" />
            Back to Shop
          </Link>
          <h1 className="text-xl font-bold text-shopDark">Track Your Order</h1>
        </div>

        {/* Search Form */}
        <div className="bg-white p-5 rounded-xl border border-shopBorder mb-5">
          <form onSubmit={onSearchSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-shopDark">Order Tracking ID</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-shopMuted" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ORD-XXXXXXXX"
                  className="w-full pl-9 pr-3 py-2.5 border border-shopBorder rounded-lg bg-shopGray focus:outline-none focus:ring-2 focus:ring-shopOrange/30 focus:border-shopOrange transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-shopDark">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-shopMuted" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-9 pr-3 py-2.5 border border-shopBorder rounded-lg bg-shopGray focus:outline-none focus:ring-2 focus:ring-shopOrange/30 focus:border-shopOrange transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-shopOrange hover:bg-orange-600 disabled:bg-gray-400 text-white py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <Search className="w-4 h-4" />
              )}
              Search
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-xs mt-3">{error}</p>
          )}
        </div>

        {/* Results */}
        {foundOrder && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500">

            {/* Status Card */}
            <div className="bg-white p-5 rounded-xl border border-shopBorder">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-shopBorder">
                <div>
                  <p className="text-xs text-shopMuted uppercase tracking-wider">Order ID</p>
                  <p className="text-sm font-bold text-shopOrange">{foundOrder.orderId}</p>
                </div>
                <div className="bg-shopOrange/10 border border-shopOrange/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-shopOrange capitalize">
                    {foundOrder.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-4">
                <Clock className="w-3.5 h-3.5 text-shopMuted" />
                <span className="text-xs text-shopMuted">Last update: Recent</span>
              </div>
              <TrackingTimeline currentStatus={foundOrder.status} />
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-5 rounded-xl border border-shopBorder">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-shopOrange" />
                <span className="text-xs font-bold text-shopDark uppercase tracking-wider">Delivery Address</span>
              </div>
              <p className="text-sm font-semibold text-shopDark">{foundOrder.shippingDetails.name}</p>
              <p className="text-xs text-shopMuted mt-0.5">{foundOrder.shippingDetails.phone}</p>
              <p className="text-xs text-shopMuted mt-1.5 leading-relaxed">
                {foundOrder.shippingDetails.address},<br />
                {foundOrder.shippingDetails.thana}, {foundOrder.shippingDetails.district}
              </p>
            </div>

            {/* Order Items */}
            <div className="bg-white p-5 rounded-xl border border-shopBorder">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-shopOrange" />
                  <span className="text-xs font-bold text-shopDark uppercase tracking-wider">Order Items</span>
                </div>
                <span className="text-xs font-bold text-shopDark">
                  Total: ৳{foundOrder.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {foundOrder.items.map((item: any, idx: number) => (
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
              </div>
            </div>

          </div>
        )}

        {/* Empty State */}
        {!foundOrder && !isSearching && !error && (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <div className="w-14 h-14 bg-white border border-shopBorder rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-shopMuted" />
            </div>
            <p className="text-sm font-medium text-shopDark">Enter your order details above</p>
            <p className="text-xs text-shopMuted">Check your SMS for tracking information.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-shopOrange"></div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}