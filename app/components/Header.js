"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100/50 py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-sky-200 transition-transform group-hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5.5 h-5.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.893 13.393l-1.135-1.135a9.052 9.052 0 00-3.096-2.128 9.02 9.02 0 00-4.322 0 9.05 9.05 0 00-3.097 2.128L8.11 13.4M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
                QUATTRO
              </span>
              <span className="text-[10px] font-bold text-sky-600 tracking-wider uppercase mt-1">
                INDUSTRIES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* CTA Action button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-600 transition-colors shadow-sm"
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
            <hr className="border-slate-100 my-2" />
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
