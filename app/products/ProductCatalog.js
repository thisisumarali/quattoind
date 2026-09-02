"use client";

import { useState } from "react";

export default function ProductCatalog({ initialProducts, categories = [] }) {
  const [activeTab, setActiveTab] = useState("all");

  const allCategories = [
    { name: "All Products", slug: "all" },
    ...categories,
  ];

  const filteredProducts =
    activeTab === "all"
      ? initialProducts
      : initialProducts.filter((prod) => prod.category.toLowerCase().trim() === activeTab);

  return (
    <div className="w-full bg-white flex flex-col min-h-[60vh]">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Certified Stock</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Our Product Catalog</h1>
          <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
            All elements are imported directly from USA manufacturers and carry factory test specifications and unique serial codes for authenticity.
          </p>
        </div>
      </section>

      {/* Tabs Menu */}
      <section className="border-b border-slate-100 py-6 bg-white sticky top-[64px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {allCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveTab(category.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === category.slug
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 sm:py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-slate-500 font-semibold">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100/10 hover:shadow-xl hover:shadow-slate-200/30 hover:-translate-y-1 transition-all duration-300 p-6 space-y-6"
                >
                  <div className="space-y-4">
                    {/* Badge Category */}
                    <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                      {prod.category === "filmtec"
                        ? "DuPont Filmtec"
                        : prod.category === "toray"
                        ? "Toray Membranes"
                        : prod.category === "awc"
                        ? "AWC Chemicals"
                        : "CLACK Media"}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {prod.desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <a
                      href={prod.specLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-sm w-full justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 text-sky-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      Download Spec Sheet
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
