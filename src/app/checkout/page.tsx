"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { MoveLeft, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalAmount, totalItems, clearCart } = useCart();
  const [shippingFee, setShippingFee] = useState(60); // Default to Dhaka rate
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

  // Handle shipping cost logic
  const handleShippingChange = (district: string) => {
    if (district === "Dhaka") {
      setShippingFee(60);
    } else if (district) {
      setShippingFee(120);
    } else {
      setShippingFee(60); // fallback
    }
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!formData.name || !formData.phone || !formData.district || !formData.thana || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const orderId = `SHP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const newOrder = {
        orderId,
        items,
        totalAmount: totalAmount + shippingFee,
        shippingFee,
        shippingDetails: formData,
        status: "placed",
        createdAt: new Date().toISOString()
      };

      // Save to all orders
      const existingOrders = JSON.parse(localStorage.getItem("shoptimizer_orders") || "[]");
      localStorage.setItem("shoptimizer_orders", JSON.stringify([newOrder, ...existingOrders]));

      // Save as latest order for the success page
      localStorage.setItem("shoptimizer_latest_order", JSON.stringify(newOrder));

      // Clear cart
      clearCart();

      // Redirect
      router.push("/order-success");
    }, 1500);
  };

  if (!isLoaded) return null;

  // Protect the page if cart is empty
  if (totalItems === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in zoom-in duration-500">
        <div className="p-8 bg-white dark:bg-zinc-950 rounded-full border border-zinc-100 dark:border-zinc-800 shadow-xl">
           <MoveLeft className="w-16 h-16 text-shopOrange opacity-20" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-2 uppercase tracking-tighter">Your cart is empty</h2>
          <p className="text-zinc-500 font-medium">Add some products to your cart before checking out.</p>
        </div>
        <Link 
          href="/" 
          className="bg-shopOrange hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold transition-all hover:shadow-lg active:scale-95 uppercase tracking-wider"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex flex-col gap-2">
           <Link href="/cart" className="flex items-center gap-2 text-zinc-500 hover:text-shopOrange transition-colors text-sm font-bold uppercase tracking-widest group">
              <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Modify Cart
           </Link>
           <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase">
             Proceed to <span className="text-shopOrange">Checkout</span>
           </h1>
        </div>
        
        {/* Trust Badges */}
        <div className="flex items-center gap-8 bg-white dark:bg-zinc-900 p-4 px-6 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
           <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-shopGreen" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Secure Payment</span>
           </div>
           <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-shopBlue" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Cash on Delivery</span>
           </div>
        </div>
      </div>

      {/* Main Grid Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <CheckoutForm 
             formData={formData}
             onFormChange={handleFormChange}
             onShippingChange={handleShippingChange} 
           />
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-4">
           <OrderSummary 
             shippingFee={shippingFee} 
             onConfirm={handlePlaceOrder}
             isSubmitting={isSubmitting}
           />
        </div>

      </div>
    </div>
  );
}
