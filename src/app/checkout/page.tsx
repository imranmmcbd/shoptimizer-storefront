"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { MoveLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalAmount, totalItems, clearCart } = useCart();
  const [shippingFee, setShippingFee] = useState(60);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    district: "",
    thana: "",
    address: "",
    notes: ""
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleShippingChange = (district: string) => {
    if (district === "Dhaka") {
      setShippingFee(60);
    } else if (district) {
      setShippingFee(120);
    } else {
      setShippingFee(60);
    }
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.phone || !formData.district || !formData.thana || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          district: formData.district,
          thana: formData.thana,
          address_line: formData.address,
          notes: formData.notes,
          payment_method: "cod",
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Order failed");

      localStorage.setItem("shoptimizer_latest_order", JSON.stringify({
        orderId: data.order?.order_number,
        items,
        totalAmount: totalAmount + shippingFee,
        shippingFee,
        shippingDetails: formData,
        status: "placed",
        createdAt: new Date().toISOString()
      }));

      clearCart();
      router.push("/order-success");

    } catch (error: any) {
      alert(error.message || "Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) return null;

  if (totalItems === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-shopMuted text-sm">Your cart is empty.</p>
        <Link href="/" className="bg-shopOrange text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-shopGray min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-shopMuted hover:text-shopOrange transition-colors text-xs font-medium uppercase tracking-wider"
          >
            <MoveLeft className="w-3.5 h-3.5" />
            Modify Cart
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-shopDark mb-4">
          Proceed to Checkout
        </h1>

        {/* Trust Badges */}
<div className="flex items-center justify-center gap-8 bg-white border border-shopBorder rounded-xl p-3 mb-6 w-full">
  <div className="flex items-center gap-2">
    <ShieldCheck className="w-4 h-4 text-shopGreen" />
    <span className="text-sm font-medium text-shopText">Secure Payment</span>
  </div>
  <div className="w-px h-5 bg-shopBorder"></div>
  <div className="flex items-center gap-2">
    <Truck className="w-4 h-4 text-shopOrange" />
    <span className="text-sm font-medium text-shopText">Cash on Delivery</span>
  </div>
</div>
        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm
              formData={formData}
              onFormChange={handleFormChange}
              onShippingChange={handleShippingChange}
            />
          </div>
          <div className="lg:col-span-5">
            <OrderSummary
              shippingFee={shippingFee}
              onConfirm={handlePlaceOrder}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

      </div>
    </div>
  );
}