import type { Metadata } from "next";
import { Alice, Bree_Serif, Roboto } from "next/font/google";
import "./globals.css";

const alice = Alice({ subsets: ["latin"], weight: "400", variable: "--font-alice" });
const bree = Bree_Serif({ subsets: ["latin"], weight: "400", variable: "--font-bree" });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "Origen Bistro & Bakery",
  description: "Premium bakery, brunch, coffee and bistro in St. Catharines, Ontario.",
  openGraph: {
    title: "Origen Bistro & Bakery",
    description: "Artisan bakery, brunch, coffee and bistro in St. Catharines, Ontario.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${alice.variable} ${bree.variable} ${roboto.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
