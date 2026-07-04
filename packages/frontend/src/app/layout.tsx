import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: { default: "Luxe Fabrics | Premium Quality Fabrics & Textiles", template: "%s | Luxe Fabrics" },
  description: "Discover premium quality fabrics, silk, cotton, linen, and designer textiles. Wholesale and retail available. Free shipping on orders over Rs 5,000.",
  keywords: ["fabrics", "textiles", "silk", "cotton", "linen", "premium fabrics", "wholesale fabrics", "online fabric store Pakistan"],
  openGraph: { type: "website", locale: "en_PK", siteName: "Luxe Fabrics" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <CartDrawer />
        <Toaster position="top-right" />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
