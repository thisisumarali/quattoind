import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact Us | Quattro Industries Water Filtration",
  description: "Get in touch with our Pakistan head office in Karachi or our US liaison office in Austin, Texas. Find our business hours, email and phone contact details.",
};

export default function Contact() {
  const offices = [
    {
      country: "Pakistan Head Office",
      address: "Plot # 66-C, Office # 501 Al-Murtaza Commercial Lane 2 Phase VIII, Karachi",
      phones: ["+92 (21) 35850003", "+92-301-2554453", "+92-330-8222274"],
      email: "info@quattroind.com",
    },
    {
      country: "USA Liaison Office",
      address: "Quattro Industries, Inc. 324 St. Stephens School Road Austin, Texas 78746",
      phones: ["+1-512-328-0704"],
      email: "info@quattroind.com",
    },
  ];

  const businessHours = [
    { day: "Monday - Friday", time: "9am to 6pm" },
    { day: "Saturday", time: "9am to 4pm" },
    { day: "Sunday", time: "Closed", highlight: true },
  ];

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Support Center</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Contact Our Offices</h1>
        </div>
      </section>

      {/* Main Content Info Grid */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left/Middle Column: Contact details and Business Hours */}
            <div className="lg:col-span-2 space-y-12">
              {/* Offices Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm shadow-slate-100/10 space-y-6"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold tracking-wider text-sky-600 uppercase">Location</span>
                      <h3 className="text-lg font-extrabold text-slate-900">{office.country}</h3>
                    </div>

                    <div className="space-y-4 text-sm text-slate-500">
                      {/* Address */}
                      <div className="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-sky-500 shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <p>{office.address}</p>
                      </div>

                      {/* Phones */}
                      <div className="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-sky-500 shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.184-4.162-7-7l1.293-.97c.363-.271.527-.834.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <div className="space-y-0.5">
                          {office.phones.map((phone, i) => (
                            <span key={i} className="block font-medium text-slate-800">{phone}</span>
                          ))}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-sky-500 shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <a href={`mailto:${office.email}`} className="font-semibold text-slate-800 hover:text-sky-600 transition-colors">{office.email}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold tracking-wider text-sky-600 uppercase">Availability</span>
                  <h3 className="text-lg font-extrabold text-slate-900">Business Hours</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {businessHours.map((hour, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-center items-center text-center space-y-1"
                    >
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{hour.day}</span>
                      <span className={`text-base font-extrabold ${hour.highlight ? "text-rose-500" : "text-slate-900"}`}>
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
