"use client";

import { useState } from "react";

export default function Products() {
  const [activeTab, setActiveTab] = useState("all");

  const productCategories = [
    { id: "all", name: "All Products" },
    { id: "filmtec", name: "Filmtec Membranes" },
    { id: "toray", name: "Toray Membranes" },
    { id: "awc", name: "AWC Chemicals" },
    { id: "media", name: "Filter Media" },
  ];

  const products = [
    // Filmtec
    {
      category: "filmtec",
      name: "DuPont FilmTec BW30 PRO-400",
      desc: "High Rejection and High Performance Industry-Standard Brackish Water Reverse Osmosis Membrane Element.",
      specLink: "https://quattroind.com/wp-content/uploads/2023/06/RO-FilmTec-BW30-PRO-400-PDS-45-D03742-en.pdf",
    },
    {
      category: "filmtec",
      name: "DuPont FilmTec SW30HRLE-400",
      desc: "High Rejection, Seawater Reverse Osmosis Element.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/SW30HRLE-400.pdf",
    },
    {
      category: "filmtec",
      name: "DuPont FilmTec SW30HRLE-440i",
      desc: "High Rejection, Seawater Reverse Osmosis Element with iLEC™ Interlocking Endcaps.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/SW30HREL-440i.pdf",
    },
    {
      category: "filmtec",
      name: "DuPont FilmTec SW30HRLE-4040",
      desc: "4″ Seawater Reverse Osmosis Element.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/SW30HRLE-4040.pdf",
    },
    {
      category: "filmtec",
      name: "DuPont FilmTec BW30-400",
      desc: "High Rejection, High Surface Area Brackish Water RO Element.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/SW30HRLE-400.pdf",
    },
    // Toray
    {
      category: "toray",
      name: "Toray TM710D",
      desc: "4″ High Rejection BWRO, enhanced chemical tolerance.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/TM700D.pdf",
    },
    {
      category: "toray",
      name: "Toray TM720D-400",
      desc: "High Rejection, high performance brackish water RO membrane.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/TM700D.pdf",
    },
    {
      category: "toray",
      name: "Toray TM720D-440",
      desc: "440 sq.ft of extra membrane surface area for higher flow rate and water production.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/TM700D.pdf",
    },
    {
      category: "toray",
      name: "Toray TM820V-400",
      desc: "Exceptional seawater membrane by Toray.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/TM800V.pdf",
    },
    {
      category: "toray",
      name: "Toray TMG20D-400",
      desc: "Low energy variable membrane – Highest Rated.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/TMGD.pdf",
    },
    {
      category: "toray",
      name: "Toray TML720D-400",
      desc: "Brackish water membrane designed for high chemical tolerance.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/TMLD.pdf",
    },
    // AWC Chemicals
    {
      category: "awc",
      name: "AWC A-100 Antiscalant",
      desc: "Reverse Osmosis Membrane Antiscalant General Purpose. Controls inorganic scale deposits.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/AWC-A-100-PDS-2017_.pdf",
    },
    {
      category: "awc",
      name: "AWC C-205 Membrane Cleaner",
      desc: "Low pH Membrane Cleaning Compound. Highly effective against metal hydroxides and carbonates.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/AWC-C-205-PDS-2017.pdf",
    },
    {
      category: "awc",
      name: "AWC C-226 Membrane Cleaner",
      desc: "High pH Membrane Cleaning Compound. Removes organic matter, silica scale, and bio-slime.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/AWC-C-226-PDS-2017.pdf",
    },
    // Filter Media
    {
      category: "media",
      name: "Clack BIRM",
      desc: "Granular Filter Media. Highly efficient and cost-effective iron and manganese removal media.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/birm_2350.pdf",
    },
    {
      category: "media",
      name: "Clack CS-HAC Carbon",
      desc: "Clack Coconut Shell High Activated Carbon. Designed for chlorine, taste, and odor reduction.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/coconut_shell_high_activated_carbon_2820.pdf",
    },
    {
      category: "media",
      name: "Clack ANTHRACITE",
      desc: "Ideal for single bed, dual bed or multi-media water filtration systems.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/anthracite_2354.pdf",
    },
    {
      category: "media",
      name: "Clack FILTER-AG",
      desc: "Silica, Crystalline Quartz Media. Less pressure loss and high particulate load capacity.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/filter-ag_2351.pdf",
    },
    {
      category: "media",
      name: "Clack FILTER-AG PLUS",
      desc: "Clinoptilolite Natural Media. Premium filtration media with high surface area and 5-micron rating.",
      specLink: "http://quattroind.com/wp-content/uploads/2018/07/filter-ag_plus_2718.pdf",
    },
  ];

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((prod) => prod.category === activeTab);

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
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === category.id
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
              {filteredProducts.map((prod, idx) => (
                <div
                  key={idx}
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
