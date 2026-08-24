import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "About Us | Quattro Industries Water Filtration",
  description: "Learn more about Quattro Industries, our history of supplying genuine Reverse Osmosis components since 1991, USA manufacturer partnerships, and Karachi warehouse operations.",
};

export default function About() {
  const historyMilestones = [
    { year: "2016", title: "Headquarters Expansion", desc: "Moved our Karachi main office to our current location in Phase VIII, Karachi to accommodate larger stock and administrative capacity." },
    { year: "2014", title: "Brand Identity Creation", desc: "Quattro launched its modern corporate brand identity to reflect our status as premium standard suppliers." },
    { year: "2006", title: "USA Liaison Office Opens", desc: "Established our Austin, Texas office to maintain direct relationships with US manufacturers (DuPont, Clack, AWC)." },
    { year: "1998", title: "Inauguration of Pakistan Branch Office", desc: "Opened our official distribution branch in Karachi to supply membranes directly to local filtration assembly plants." },
    { year: "1991", title: "Business Foundation", desc: "Quattro Industries went into business, starting with direct import of premium industrial media." },
  ];

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Page Header */}
      <section className="bg-slate-50 border-b border-slate-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Corporate Profile</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">About Quattro Industries</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Story & Background */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Desalination & Water Purification Experts</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  We are specialized distributors of Filmtec membranes, Toray membranes, and AWC antiscalant chemicals. We are also authorized distributors of CLACK filter media products (Birm, Anthracite, Activated Carbon, and Filter-Ag/Filter-Ag Plus) which are 100% made in the USA.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Our Austin, Texas office maintains long-term relationships directly with our US manufacturers. This allows us to ship all products straight to our Karachi warehouse without middle-men, offering certified authenticity at reasonable prices.
                </p>
              </div>

              {/* Bullet points detailing inventory */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Key Facts & Capacities:</h4>
                <ul className="space-y-3 text-xs font-semibold text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>Carry 8-inch and 4-inch membrane elements, both for brackish and seawater.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>Every membrane is supplied with factory test sheets and matching serial numbers.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>AWC antiscalant and cleaners are carried in convenient 5-gallon pails.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>Authorized CLACK media distributors made in USA.</span>
                  </li>
                </ul>
              </div>

              {/* Technical Expertise Footnote */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <h4 className="text-sm font-bold text-slate-900">Technical Expertise</h4>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  Provide RO filter media, system antiscalants, and membranes (brackish & seawater) from our Karachi head office to plants and municipal systems throughout Karachi, Lahore, Islamabad, and nationwide.
                </p>
              </div>
            </div>

            {/* History timeline */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-slate-900">Our History</h3>
              <div className="relative border-l border-slate-200 pl-6 space-y-8 ml-3">
                {historyMilestones.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-sky-500 bg-white shadow-sm" />
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-sky-600">{item.year}</span>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Query/Form Section */}
      <section className="py-12 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Contact</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950">Need Sizing Support?</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Whether you need technical datasheets, advice on media bed expansion, or AWC antiscalant dosing advice, our support staff has combined experience in the US and Pakistan to assist your plant engineering requirements.
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
