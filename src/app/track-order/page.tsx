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

  // Handle automatic search from URL params
  useEffect(() => {
    const qId = searchParams.get("id");
    const qPhone = searchParams.get("phone");

    if (qId && qPhone) {
      setOrderId(qId);
      setPhoneNumber(qPhone);
      handleSearch(qId, qPhone);
    }
  }, [searchParams]);

  const handleSearch = (id: string, phone: string) => {
    setIsSearching(true);
    setError("");
    
    // Simulate API delay
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem("shoptimizer_orders") || "[]");
      const order = orders.find(
        (o: any) => o.orderId === id && o.shippingDetails.phone === phone
      );

      if (order) {
        setFoundOrder(order);
      } else {
        setError("Order not found. Please check your tracking ID and phone number.");
        setFoundOrder(null);
      }
      setIsSearching(false);
    }, 1000);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && phoneNumber) {
      handleSearch(orderId, phoneNumber);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col gap-2 mb-10">
         <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-shopOrange transition-colors text-sm font-bold uppercase tracking-widest group">
            <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
         </Link>
         <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase">
           Track Your <span className="text-shopOrange">Order</span>
         </h1>
      </div>

      {/* Search Box */}
      <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl mb-12">
         <form onSubmit={onSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-5 flex flex-col gap-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Order Tracking ID</label>
               <div className="relative">
                 <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                 <input 
                   type="text" 
                   value={orderId}
                   onChange={(e) => setOrderId(e.target.value)}
                   placeholder="e.g. SHP-2026-X8Y7Z"
                   className="w-full pl-12 pr-4 py-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-shopOrange focus:border-transparent transition-all font-bold tracking-wider placeholder:font-medium uppercase"
                   required
                 />
               </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Phone Number</label>
               <div className="relative">
                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                 <input 
                   type="tel" 
                   value={phoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)}
                   placeholder="01XXXXXXXXX"
                   className="w-full pl-12 pr-4 py-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-shopOrange focus:border-transparent transition-all font-bold tracking-wider placeholder:font-medium"
                   required
                 />
               </div>
            </div>
            <div className="md:col-span-2">
               <button 
                 type="submit"
                 disabled={isSearching}
                 className="w-full bg-shopOrange hover:bg-orange-600 disabled:bg-zinc-400 text-white p-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 h-[58px]"
               >
                 {isSearching ? (
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                 ) : (
                   <Search className="w-5 h-5" />
                 )}
                 SEARCH
               </button>
            </div>
         </form>
         {error && <p className="text-red-500 text-xs font-bold mt-4 uppercase tracking-wider ml-1">{error}</p>}
      </div>

      {/* Result Display */}
      {foundOrder && (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
           
           {/* Order Status Section */}
           <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-8">
                <div>
                   <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase leading-none mb-2">
                     Status for <span className="text-shopOrange">{foundOrder.orderId}</span>
                   </h2>
                   <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-zinc-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Last update: Recent</span>
                   </div>
                </div>
                <div className="bg-shopOrange/10 border border-shopOrange/20 px-4 py-2 rounded-full">
                   <span className="text-xs font-black uppercase tracking-widest text-shopOrange">Current Status: {foundOrder.status || "Placed"}</span>
                </div>
              </div>

              <TrackingTimeline currentStatus={foundOrder.status || "placed"} />
           </div>

           {/* Details Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Shipping Address */}
              <div className="bg-zinc-900 text-white p-8 rounded-2xl border border-zinc-800 shadow-xl flex flex-col gap-6">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                       <MapPin className="w-5 h-5 text-shopOrange" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Delivery Address</span>
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-1">{foundOrder.shippingDetails.name}</h4>
                    <p className="text-zinc-400 font-medium">{foundOrder.shippingDetails.phone}</p>
                    <p className="text-zinc-400 mt-4 leading-relaxed font-medium">
                      {foundOrder.shippingDetails.address},<br />
                      {foundOrder.shippingDetails.thana}, {foundOrder.shippingDetails.district}
                    </p>
                 </div>
              </div>

              {/* Items Card */}
              <div className="bg-white dark:bg-zinc-950 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col gap-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-shopBlue" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Order Items</span>
                    </div>
                    <span className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                       Total: ৳{foundOrder.totalAmount.toLocaleString()}
                    </span>
                 </div>
                 <div className="flex flex-col gap-4 overflow-y-auto max-h-[160px] pr-2 no-scrollbar">
                    {foundOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-sm border-b border-zinc-50 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
                         <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                           {item.name}
                           <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-md text-zinc-500 uppercase tracking-widest">x{item.quantity}</span>
                         </span>
                         <span className="font-black text-zinc-900 dark:text-zinc-50">৳{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                 </div>
              </div>

           </div>

        </div>
      )}

      {/* Empty State / Help Area */}
      {!foundOrder && !isSearching && !error && (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-2">
              <Truck className="w-10 h-10 text-zinc-400" />
           </div>
           <div>
             <h3 className="text-lg font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200">Enter order details above</h3>
             <p className="text-xs font-medium text-zinc-500">Check your email or SMS for the tracking information.</p>
           </div>
        </div>
      )}

    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-shopOrange"></div>
       </div>
    }>
       <TrackOrderContent />
    </Suspense>
  );
}
