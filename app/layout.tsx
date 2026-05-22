import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FTL - Room Booking Management",
  description: "FTL Room Booking Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-bg">
        <Header />
        <div className="flex" style={{ minHeight: "calc(100vh - 79px)" }}>
          <Sidebar />
          <main className="flex-1 pl-[29px] pr-[120px] pt-[108px]">
            <div className="w-full max-w-[1200px]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
