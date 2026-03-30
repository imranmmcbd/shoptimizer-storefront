"use client";

import { Check, Package, Truck, Home, Clock } from "lucide-react";

type OrderStatus = "placed" | "processing" | "shipped" | "delivered";

interface TrackingTimelineProps {
  currentStatus: OrderStatus;
}

const STAGES = [
  { id: "placed", label: "Order Placed", icon: Check },
  { id: "processing", label: "Processing", icon: Clock },
  { id: "shipped", label: "Shipped", icon: Truck },
  { id: "delivered", label: "Delivered", icon: Home },
];

export default function TrackingTimeline({ currentStatus }: TrackingTimelineProps) {
  const currentStageIndex = STAGES.findIndex(s => s.id === currentStatus);

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between">
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-shopOrange -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out"
          style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
        ></div>

        {/* Status Nodes */}
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const isCompleted = index <= currentStageIndex;
          const isActive = index === currentStageIndex;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-3">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isCompleted 
                    ? "bg-shopOrange border-shopOrange text-white shadow-lg shadow-orange-200 dark:shadow-none" 
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400"
                } ${isActive ? "scale-125" : ""}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
              </div>
              <span className={`text-[10px] md:text-xs font-black uppercase tracking-tighter text-center ${
                isCompleted ? "text-shopOrange" : "text-zinc-500"
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
