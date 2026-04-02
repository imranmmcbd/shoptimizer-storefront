"use client";

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
      onFormChange({ ...newData, thana: "" });
    }
  };

  const inputStyles = "w-full px-3 py-2.5 border border-shopBorder rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-shopOrange/30 focus:border-shopOrange transition-all text-sm text-shopText placeholder:text-gray-400";
  const labelStyles = "block text-sm font-medium text-shopDark mb-1.5";

  return (
    <div className="bg-white p-5 rounded-xl border border-shopBorder">
      <h2 className="text-base font-bold text-shopDark mb-5 pb-3 border-b border-shopBorder">
        Shipping Information
      </h2>

      <div className="flex flex-col gap-4">

        {/* Full Name */}
        <div>
          <label className={labelStyles}>
            Full Name <span className="text-shopOrange">*</span>
          </label>
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

        {/* Phone */}
        <div>
          <label className={labelStyles}>
            Phone Number <span className="text-shopOrange">*</span>
          </label>
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

        {/* Email */}
        <div>
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

        {/* District */}
        <div>
          <label className={labelStyles}>
            District <span className="text-shopOrange">*</span>
          </label>
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

        {/* Thana */}
        <div>
          <label className={labelStyles}>
            Thana / Area <span className="text-shopOrange">*</span>
          </label>
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
            {!THANAS[formData.district] && formData.district && (
              <option value="Other">Other</option>
            )}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className={labelStyles}>
            Detailed Address <span className="text-shopOrange">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="House no, Road no, Moholla, etc."
            className={inputStyles}
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className={labelStyles}>Order Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={2}
            placeholder="Anything you want to tell us..."
            className={inputStyles}
          />
        </div>

      </div>
    </div>
  );
}