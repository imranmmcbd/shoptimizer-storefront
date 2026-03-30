"use client";

import { useState } from "react";
import { DISTRICTS, THANAS } from "@/lib/locationData";

interface CheckoutFormProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    district: string;
    thana: string;
    address: string;
    notes: string;
  };
  onFormChange: (data: any) => void;
  onShippingChange: (district: string) => void;
}

export default function CheckoutForm({ formData, onFormChange, onShippingChange }: CheckoutFormProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    onFormChange(newData);

    if (name === "district") {
      onShippingChange(value);
      onFormChange({ ...newData, thana: "" }); // Reset thana when district changes
    }
  };

  const inputStyles = "w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-shopOrange focus:border-transparent transition-all";
  const labelStyles = "block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2";

  return (
    <div className="bg-white dark:bg-zinc-950 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50 border-b pb-4 border-zinc-100 dark:border-zinc-800">
        Shipping Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className={labelStyles}>Full Name <span className="text-shopOrange">*</span></label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className={inputStyles}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className={labelStyles}>Phone Number <span className="text-shopOrange">*</span></label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className={inputStyles}
            required
          />
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <label className={labelStyles}>Email Address (Optional)</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputStyles}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className={labelStyles}>District <span className="text-shopOrange">*</span></label>
          <select 
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={inputStyles}
            required
          >
            <option value="">Select District</option>
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex flex-col">
          <label className={labelStyles}>Thana / Area <span className="text-shopOrange">*</span></label>
          <select 
            name="thana"
            value={formData.thana}
            onChange={handleChange}
            className={inputStyles}
            disabled={!formData.district}
            required
          >
            <option value="">Select Thana</option>
            {THANAS[formData.district]?.map(t => <option key={t} value={t}>{t}</option>)}
            {!THANAS[formData.district] && formData.district && <option value="Other">Other</option>}
          </select>
        </div>
      </div>

      <div className="flex flex-col mb-6">
        <label className={labelStyles}>Detailed Address <span className="text-shopOrange">*</span></label>
        <textarea 
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          placeholder="House no, Road no, Moholla, etc."
          className={inputStyles}
          required
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className={labelStyles}>Order Notes (Optional)</label>
        <textarea 
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={2}
          placeholder="Anything you want to tell us..."
          className={inputStyles}
        ></textarea>
      </div>
    </div>
  );
}
