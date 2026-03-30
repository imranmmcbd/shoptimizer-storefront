"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Package, Truck, MoveRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const latestOrder = localStorage.getItem("shoptimizer_latest_order");
    if (latestOrder) {
      setOrder(JSON.parse(latestOrder));
    } else {
      // If no order exists, redirect back to shop
      // router.replace("/");
    }
  }, []);

  if (!order) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-shopOrange"></div>
      <p className="text-zinc-500 font-medium">Verifying your order...</p>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-20 animate-in fade-in zoom-in duration-700">
      
      {/* Success Hero */}
      <div className="flex flex-col items-center text-center gap-6 mb-12">
        <div className="w-24 h-24 bg-shopGreen/10 rounded-full flex items-center justify-center border-4 border-shopGreen/20 shadow-xl shadow-green-50 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-shopGreen" />
        </div>
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase mb-2">
            Order <span className="text-shopGreen">Placed!</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
            Thank you, {order.shippingDetails.name}! Your order has been received.
          </p>
        </div>
      </div>

      {/* Order Info Card */}
      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden mb-12">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Order Tracking ID</span>
             <h3 className="text-xl font-bold text-shopOrange">{order.orderId}</h3>
           </div>
           <div className="text-right md:text-right w-full md:w-auto">
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Amount Paid</span>
             <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase leading-none">
                ৳{(order.totalAmount).toLocaleString()}
             </h3>
           </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Shipping Details */}
              <div className="flex flex-col gap-4">
                 <h4 className="font-black text-xs uppercase tracking-widest text-zinc-800 dark:text-zinc-200 flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-shopOrange" />
                    Shipping to
                 </h4>
                 <div className="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-xl border border-zinc-100 dark:border-zinc-800 text-sm">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{order.shippingDetails.name}</p>
                    <p className="text-zinc-500">{order.shippingDetails.phone}</p>
                    <p className="text-zinc-500 mt-2 leading-relaxed">
                      {order.shippingDetails.address},<br />
                      {order.shippingDetails.thana}, {order.shippingDetails.district}
                    </p>
                 </div>
              </div>

              {/* Order Items Summary */}
              <div className="flex flex-col gap-4">
                 <h4 className="font-black text-xs uppercase tracking-widest text-zinc-800 dark:text-zinc-200 flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-shopBlue" />
                    Package Details
                 </h4>
                 <div className="flex flex-col gap-3">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-sm border-b border-zinc-100 dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                         <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                           {item.name} <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full ml-1">x{item.quantity}</span>
                         </span>
                         <span className="font-bold text-zinc-900 dark:text-zinc-100">
                           ৳{(item.price * item.quantity).toLocaleString()}
                         </span>
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between font-black uppercase text-xs tracking-widest text-zinc-800 dark:text-zinc-200">
                       <span>Total + Delivery fee</span>
                       <span className="text-shopOrange">৳{order.totalAmount.toLocaleString()}</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
         <Link 
           href={`/track-order?id=${order.orderId}&phone=${order.shippingDetails.phone}`}
           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 dark:bg-shopOrange text-white py-4 px-8 rounded-lg font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] group"
         >
           <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
           Track Your Order
           <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
         </Link>
         <Link 
           href="/" 
           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 py-4 px-8 rounded-lg font-black text-sm uppercase tracking-widest transition-all"
         >
           <ShoppingBag className="w-5 h-5" />
           Continue Shopping
         </Link>
      </div>

      <p className="text-center text-[10px] text-zinc-400 mt-12 font-medium uppercase tracking-widest leading-relaxed">
        A confirmation email and SMS has been sent to your provided contact details.<br />
        Orders are typically processed within 24 hours.
      </p>

    </div>
  );
}
