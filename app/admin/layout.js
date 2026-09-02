"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/actions";
import { 
  LayoutDashboard, 
  Package, 
  Mail, 
  LogOut, 
  ArrowLeft,
  Menu,
  X,
  Layers
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Skip layout rendering on the login screen
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Products", href: "/admin/products", icon: Package },
    { name: "Manage Categories", href: "/admin/categories", icon: Layers },
    { name: "Customer Inquiries", href: "/admin/inquiries", icon: Mail },
  ];

  const handleLogout = async () => {
    const res = await adminLogout();
    if (res.success) {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <header className="md:hidden bg-slate-900 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="/admin" className="font-extrabold tracking-tight text-lg">
          QUATTRO <span className="text-sky-400 text-xs font-bold uppercase tracking-widest ml-1">Admin</span>
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-slate-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar - Desktop */}
      <aside className={`
        ${mobileMenuOpen ? "block" : "hidden"} 
        md:block md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between shadow-xl z-50
      `}>
        <div className="p-6 space-y-8">
          <div className="hidden md:block">
            <Link href="/admin" className="flex flex-col">
              <span className="text-white font-extrabold text-lg tracking-tight">QUATTRO</span>
              <span className="text-sky-400 text-[10px] font-bold tracking-wider uppercase">Admin Control</span>
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive 
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/10" 
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all text-slate-400"
          >
            <ArrowLeft className="w-5 h-5" />
            Main Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Dashboard Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
