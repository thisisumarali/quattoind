"use client";

import { useState } from "react";
import { submitInquiry } from "@/app/actions";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    // Validate inputs
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({
        submitting: false,
        submitted: false,
        error: "Please fill in all required fields (Name, Email, Phone, Message).",
      });
      return;
    }

    try {
      const data = new FormData(e.target);
      const res = await submitInquiry(data);

      if (res.success) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setStatus({
          submitting: false,
          submitted: false,
          error: res.error || "An unexpected error occurred. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        submitted: false,
        error: "An unexpected network error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-100/50 p-6 sm:p-8">
      {status.submitted ? (
        <div className="text-center py-8 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Message Sent Successfully!</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out to Quattro Industries. Our technical team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus((prev) => ({ ...prev, submitted: false }))}
            className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Get in Touch</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Have questions about our RO membranes, filtration media, or antiscalants? Send us a message and we'll reply shortly.
            </p>
          </div>

          {status.error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-600 animate-fade-in">
              {status.error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Your Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +92 300 1234567"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Clean Water Corp"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Your Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.submitting}
            className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-600 disabled:bg-slate-400 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {status.submitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending Message...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
