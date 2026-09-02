"use client";

import { useState } from "react";
import { updateInquiryStatus } from "@/app/actions";
import { Clock, CheckCircle2, XCircle, Search, Mail, Phone, Building, Calendar } from "lucide-react";

export default function InquiriesList({ initialInquiries }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusUpdate = async (id, newStatus) => {
    setLoadingId(id);
    try {
      const res = await updateInquiryStatus(id, newStatus);
      if (res.success) {
        // Update local state
        const updated = inquiries.map((inq) =>
          inq.id === id ? { ...inq, status: newStatus } : inq
        );
        setInquiries(updated);
        // Update selected modal inquiry
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      } else {
        alert(res.error || "Failed to update status");
      }
    } catch (err) {
      alert("An unexpected error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filter === "all" || inq.status === filter;
    const matchesSearch =
      search === "" ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Contacted
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-500 border border-slate-200">
            <XCircle className="w-3.5 h-3.5" />
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Customer Inquiries</h1>
        <p className="text-sm text-slate-500">
          Review and respond to messages submitted through the public website contact form.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {["all", "pending", "contacted", "closed"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                filter === s
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* Inquiries Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-semibold text-sm">
            No inquiries match your filter or search query.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-extrabold text-slate-900 text-base">{inq.name}</h3>
                    {inq.company && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wider">
                        {inq.company}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">
                      {formatDate(inq.createdAt)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {inq.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {inq.phone}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {inq.message}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  {getStatusBadge(inq.status)}
                  <div className="h-4 w-px bg-slate-200 hidden md:block" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Inquiry Details</span>
                <h2 className="text-xl font-black">{selectedInquiry.name}</h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Meta Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-sky-500" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Email</p>
                    <a href={`mailto:${selectedInquiry.email}`} className="font-semibold hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-600">
                  <Phone className="w-4 h-4 text-sky-500" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Phone</p>
                    <span className="font-semibold">{selectedInquiry.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-600">
                  <Building className="w-4 h-4 text-sky-500" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Company</p>
                    <span className="font-semibold">{selectedInquiry.company || "Not Provided"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-slate-600">
                  <Calendar className="w-4 h-4 text-sky-500" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Received Date</p>
                    <span className="font-semibold">{formatDate(selectedInquiry.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message:</h4>
                <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl text-sm text-slate-800 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Updater Panel */}
              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-500 uppercase">Current Status:</span>
                  {getStatusBadge(selectedInquiry.status)}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  {selectedInquiry.status !== "pending" && (
                    <button
                      onClick={() => handleStatusUpdate(selectedInquiry.id, "pending")}
                      disabled={loadingId !== null}
                      className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex-grow text-center"
                    >
                      Set Pending
                    </button>
                  )}
                  {selectedInquiry.status !== "contacted" && (
                    <button
                      onClick={() => handleStatusUpdate(selectedInquiry.id, "contacted")}
                      disabled={loadingId !== null}
                      className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex-grow text-center"
                    >
                      Set Contacted
                    </button>
                  )}
                  {selectedInquiry.status !== "closed" && (
                    <button
                      onClick={() => handleStatusUpdate(selectedInquiry.id, "closed")}
                      disabled={loadingId !== null}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex-grow text-center"
                    >
                      Close Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
