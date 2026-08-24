import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quattro Industries | Genuine RO Membranes, Water Filters & Antiscalants",
  description: "Authorized distributors of Filmtec & Toray Membranes, CLACK media, and AWC Chemicals in Karachi, Pakistan & USA. 100% certified and genuine industrial water purification solutions.",
  keywords: ["RO membranes Karachi", "Toray membranes Pakistan", "Filmtec membranes Karachi", "Birm filter media Pakistan", "AWC Antiscalant", "water filtration system Pakistan"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <Header />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

