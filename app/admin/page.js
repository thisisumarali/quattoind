import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/app/actions";
import { Package, Mail, Clock, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  // Fetch dashboard metrics
  let totalProducts = 0;
  let totalInquiries = 0;
  let pendingInquiries = 0;
  let recentInquiries = [];

  try {
    totalProducts = await prisma.product.count();
    totalInquiries = await prisma.inquiry.count();
    pendingInquiries = await prisma.inquiry.count({
      where: { status: "pending" },
    });
    recentInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (error) {
    console.error("Dashboard database fetch failed:", error);
  }

  const statCards = [
    {
      title: "Total Catalog Products",
      value: totalProducts,
      desc: "Items in your product catalog",
      icon: Package,
      color: "bg-sky-500",
      link: "/admin/products",
    },
    {
      title: "Total Contact Submissions",
      value: totalInquiries,
      desc: "Total inquiries received",
      icon: Mail,
      color: "bg-emerald-500",
      link: "/admin/inquiries",
    },
    {
      title: "Pending Inquiries",
      value: pendingInquiries,
      desc: "Requires response/action",
      icon: Clock,
      color: "bg-amber-500",
      link: "/admin/inquiries",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Welcome to the Quattro Industries administration console. Here you can manage your database entries.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.link}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">{stat.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Split section: Recent inquiries and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Recent Customer Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold uppercase tracking-wider text-sky-600 hover:text-sky-700 flex items-center gap-1.5"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-semibold text-sm border-2 border-dashed border-slate-100 rounded-xl">
              No inquiries received yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">{inq.name}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {inq.company ? `${inq.company} • ` : ""}{inq.email}
                    </p>
                    <p className="text-xs text-slate-400 font-medium italic truncate max-w-lg">
                      "{inq.message}"
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    inq.status === "pending"
                      ? "bg-amber-50 text-amber-600"
                      : inq.status === "contacted"
                      ? "bg-sky-50 text-sky-600"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900">Admin Quick Tools</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-center w-full py-3 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm text-center"
            >
              Add New Product
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center justify-center w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              Review Pending Tickets
            </Link>
            <hr className="border-slate-100 my-1" />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 bg-white text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-center"
            >
              Open Live Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
