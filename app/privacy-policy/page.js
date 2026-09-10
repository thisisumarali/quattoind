import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Quattro Industries",
  description:
    "Privacy Policy for Quattro Industries. Learn how we handle customer data, quotation inquiries, cookies, and Google Ads tracking.",
};

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              1. Introduction
            </h2>
            <p>
              Quattro Industries (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal and business information when you visit our website, submit quotation requests, or interact with our industrial water treatment products and services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect information about you in a variety of ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong className="text-slate-800">Inquiry & Contact Information:</strong> When you submit an inquiry or request technical specifications for our RO membranes, antiscalants, or filtration media, we collect your name, email address, phone number, company name, and specific requirement details.
              </li>
              <li>
                <strong className="text-slate-800">Technical & Device Data:</strong> When you access our website, our servers automatically record log information such as your IP address, browser type, operating system, pages viewed, and referral URLs.
              </li>
              <li>
                <strong className="text-slate-800">Cookies and Similar Tracking Technologies:</strong> We use cookies, web beacons, and tracking pixels to analyze traffic, evaluate the effectiveness of our advertising campaigns, and improve site performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Google Ads, Analytics & Tracking Disclosure
            </h2>
            <p className="mb-3">
              In accordance with Google Advertising Policies and transparency guidelines:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                We utilize <strong className="text-slate-800">Google Ads Conversion Tracking</strong> and <strong className="text-slate-800">Google Analytics</strong> to measure campaign performance, understand how visitors interact with our website, and optimize user experience.
              </li>
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline font-medium"
                >
                  Google Ads Settings
                </a>{" "}
                or the{" "}
                <a
                  href="https://optout.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline font-medium"
                >
                  Network Advertising Initiative Opt-Out Page
                </a>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. How We Use Your Information
            </h2>
            <p className="mb-3">
              The information we collect is used strictly for legitimate commercial and technical purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Providing customized quotations and technical data sheets for water filtration media and RO systems.</li>
              <li>Responding to customer service, product availability, and shipping inquiries.</li>
              <li>Verifying client business credentials for genuine product distribution.</li>
              <li>Monitoring and preventing fraudulent inquiries and website misuse.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Sharing of Information
            </h2>
            <p>
              We do <strong className="text-slate-900">not</strong> sell, rent, or trade your personal or business data to third parties for marketing purposes. We only share information with trusted service providers who assist us in operating our website, conducting our business, or serving our clients, under strict confidentiality obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              6. Data Security
            </h2>
            <p>
              We implement industry-standard administrative and technical security measures to maintain the safety of your personal information. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              7. Contact Us
            </h2>
            <p className="mb-3">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-5 space-y-2 text-sm">
              <p className="font-bold text-slate-900">Quattro Industries</p>
              <p>Plot # 66-C, Office #501, Al-Murtaza Commercial Lane 2, Phase VIII, Karachi, Pakistan</p>
              <p>USA Office: 27611 wishing Oak Landing, Spring, TX 77386</p>
              <p>Email: <a href="mailto:info@quattroind.com" className="text-sky-600 hover:underline">info@quattroind.com</a></p>
              <p>Phone: +92-301-2554453 / +92 (21) 35850003</p>
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
