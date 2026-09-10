
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackPhoneCall } from "@/lib/gtag";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection to add elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Products", href: "/products" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100/50 py-2.5"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/logo.png"
              alt="Quattro Industries"
              width={280}
              height={95}
              className={`w-auto object-contain mix-blend-multiply transition-all duration-300 ${
                scrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-sky-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Right Side: Phone Numbers & CTA */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 shadow-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-[11px] font-bold text-slate-700 leading-tight">
                <a
                  href="tel:+923012554453"
                  onClick={() => trackPhoneCall("+92-301-2554453")}
                  className="hover:text-sky-600 transition-colors"
                >
                  +92-301-2554453
                </a>
                <a
                  href="tel:+923308222274"
                  onClick={() => trackPhoneCall("+92-330-8222274")}
                  className="hover:text-sky-600 transition-colors"
                >
                  +92-330-8222274
                </a>
                <a
                  href="tel:+922135850003"
                  onClick={() => trackPhoneCall("+92 (21) 35850003")}
                  className="hover:text-sky-600 transition-colors"
                >
                  +92 (21) 35850003
                </a>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-600 transition-colors shadow-sm shrink-0"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger toggle button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 focus:outline-none"
              aria-expanded="false"
              id="mobile-menu-btn"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-6 transition-all duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-2 transition-colors ${
                    isActive ? "text-sky-600" : "text-slate-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-slate-100 my-1" />

            {/* Direct Phone Numbers in Mobile Drawer */}
            <div className="space-y-2 py-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Direct Contact
              </span>
              <div className="flex flex-col gap-2 text-sm font-bold text-slate-800">
                <a
                  href="tel:+923012554453"
                  onClick={() => trackPhoneCall("+92-301-2554453")}
                  className="flex items-center gap-2 hover:text-sky-600"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>{" "}
                  +92-301-2554453
                </a>
                <a
                  href="tel:+923308222274"
                  onClick={() => trackPhoneCall("+92-330-8222274")}
                  className="flex items-center gap-2 hover:text-sky-600"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>{" "}
                  +92-330-8222274
                </a>
                <a
                  href="tel:+922135850003"
                  onClick={() => trackPhoneCall("+92 (21) 35850003")}
                  className="flex items-center gap-2 hover:text-sky-600"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span> +92
                  (21) 35850003
                </a>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-600 transition-colors text-center"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
