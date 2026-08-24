"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "./components/ContactForm";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "We Supply 100% Genuine & Certified RO Membranes",
      description: "Direct import from manufacturers in USA. Authenticity guaranteed with factory test results and unique serial numbers.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Filmtec Membranes (USA) in Stock for Immediate Delivery",
      description: "Leading-brand brackish water and seawater membranes. Fully stocked in Karachi warehouse to serve your industrial needs.",
      image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "Toray Membranes (USA) Available For All RO Plants",
      description: "High rejection, energy-efficient elements for brackish and seawater application with knowledgeable support in Pakistan.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      title: "Filmtec Membranes",
      desc: "Industry-standard brackish and seawater membranes by DuPont/Filmtec.",
      image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=800",
      href: "/products#filmtec-membranes",
    },
    {
      title: "Toray Membranes",
      desc: "Exceptional seawater and low-energy brackish water elements from Toray.",
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800",
      href: "/products#toray-membranes",
    },
    {
      title: "AWC Chemicals",
      desc: "Award-winning RO antiscalants and premium membrane cleaners.",
      image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800",
      href: "/products#awc-chemicals",
    },
    {
      title: "Filter Media Products",
      desc: "Clack Birm, Activated Carbon, Anthracite, and Filter-Ag media.",
      image: "https://images.unsplash.com/photo-1518281400280-85f1ae55a47e?auto=format&fit=crop&q=80&w=800",
      href: "/products#filter-media-products",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero Carousel Section */}
      <section className="relative w-full h-[550px] sm:h-[600px] bg-slate-900 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with elegant overlay */}
            <div className="absolute inset-0 bg-slate-950/65 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />
            {/* Content Container */}
            <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
              <div className="max-w-3xl space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 border border-sky-400/30 text-sky-400 uppercase tracking-widest">
                  Industrial Water Purification
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
                  {slide.description}
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-slate-900 hover:bg-sky-500 hover:text-white transition-all shadow-md"
                  >
                    View Catalog
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent border-2 border-white/60 hover:border-white text-white transition-all"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-35 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-6" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Corporate Overview ("Who We Are") */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Who We Are */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Overview</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Who We Are</h2>
              </div>
              <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                Quattro Industries is a premier distributor of high-quality Reverse Osmosis (RO) components and water treatment solutions. With strong manufacturer relationships in the USA, we import direct to our کراچی (Karachi) warehouse to ensure the most cost-effective and authentic products reach our customers.
              </p>
              <ul className="space-y-3.5 text-sm font-medium text-slate-700">
                {[
                  "Official distributors of DuPont Filmtec membranes and Toray membranes.",
                  "Authorized distributors of CLACK filter media products (Birm, Carbon, Anthracite) made in USA.",
                  "Certified authenticity: Every membrane element is supplied with factory test results and unique serial numbers.",
                  "Award-winning AWC chemical antiscalants and cleaners imported directly.",
                  "Knowledgeable local support backed by combined expertise in USA and Pakistan.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-sky-500 shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Commitment */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Dedication</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Our Commitment</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                At Quattro Industries, we align ourselves with standard-setting quality, prompt service, and unyielding support for clean water industries across Pakistan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "100% Genuine", desc: "Certified RO membranes direct from US plants." },
                  { title: "AWC Antiscalants", desc: "Award-winning membrane chemical solutions." },
                  { title: "Immediate Delivery", desc: "Fully stocked Karachi logistics warehouse." },
                  { title: "Unsurpassed Support", desc: "Experienced local technical engineers." },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5 p-4 bg-white rounded-xl border border-slate-200/50 shadow-sm shadow-slate-100/10">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Footprint Banner */}
      <section className="bg-sky-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-400">Complete Pakistan Distribution Footprint</p>
          <p className="text-base sm:text-lg text-slate-200 max-w-4xl mx-auto leading-relaxed">
            We provide RO filter media, system antiscalants, and membranes (brackish & seawater) from our Karachi head office to plants and municipal systems throughout Karachi, Lahore, Islamabad, and nationwide.
          </p>
        </div>
      </section>

      {/* Our Products Preview */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Catalog</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">Our Core Product Ranges</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We carry only the top-performing, internationally recognized brand elements to keep your desalination and water treatment plants performing at their peak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link
                href={cat.href}
                key={i}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/20 overflow-hidden hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-44 relative bg-slate-100 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-xs font-bold text-sky-600 gap-1.5 group-hover:gap-2.5 transition-all">
                    Explore Items
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Further Queries / Contact Split section */}
      <section className="py-12 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Info callout */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Get in touch</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">Have Further Queries?</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our support team is always ready to guide you. If you need membrane sizing help, antiscalant dose projection calculations, or filter media quantity estimates, feel free to contact us.
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Direct Email</h4>
                    <p className="text-sm font-bold text-slate-900">
                      <a href="mailto:info@quattroind.com" className="hover:text-sky-600 transition-colors">info@quattroind.com</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.184-4.162-7-7l1.293-.97c.363-.271.527-.834.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Customer Support Phone</h4>
                    <p className="text-sm font-bold text-slate-900">
                      +92 (21) 35850003
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
