import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Quattro Industries",
  description:
    "Terms of Service for Quattro Industries. Commercial terms, quotation terms, and website usage policies.",
};

export default function TermsOfService() {
  const lastUpdated = "March 2025";

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Header Banner */}
      <section className="bg-slate-50 border-b border-slate-100 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. Quattro Industries reserves the right to modify these terms at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Commercial Inquiries and Quotations
            </h2>
            <p className="mb-3">
              Quattro Industries specializes in industrial water treatment products, including genuine Reverse Osmosis membranes, antiscalants, and filtration media.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Submitting an inquiry through our website constitutes an invitation to treat, not a binding contract of sale.</li>
              <li>Official quotations provided by our sales team are valid for the period specified on the quotation sheet.</li>
              <li>Product availability is subject to prior sale and stock levels in our Karachi or US facilities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Product Authenticity and Manufacturer Warranties
            </h2>
            <p>
              We guarantee 100% genuine industrial products directly imported from certified manufacturers (such as Filmtec DuPont, Toray, CLACK Corporation, and AWC). Manufacturer warranties apply as per the respective OEM specifications and operating conditions. Quattro Industries provides full manufacturer documentation, batch certificates, and authenticity verification for all delivered products.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. Intellectual Property
            </h2>
            <p>
              All trademarks, product names, company names, and logos cited herein are the property of their respective owners. Content, website code, and arrangement on this website are protected under copyright and intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              Quattro Industries shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, nor from any inaccurate technical interpretations or operating parameters not confirmed by an official technical engineer.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. Governing Law and Contact
            </h2>
            <p className="mb-3">
              These terms shall be governed by and construed in accordance with the laws applicable in Pakistan and the United States for commercial transactions.
            </p>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-5 space-y-2 text-sm">
              <p className="font-bold text-slate-900">Quattro Industries</p>
              <p>Email: <a href="mailto:info@quattroind.com" className="text-sky-600 hover:underline">info@quattroind.com</a></p>
              <p>Karachi Office: +92-301-2554453 / +92-330-8222274 / +92 (21) 35850003</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold text-sky-600 hover:text-sky-700 uppercase tracking-wider"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
