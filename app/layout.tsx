import AppNav from "@/components/navigation/app-nav";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shopee",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <div className="antialiased max-w-6xl mx-auto px-1 md:px-2 ">
          <AppNav />
          <main className="mt-2 mb-6 md:mt-5 px-2 "> {children}</main>
          <Toaster
            position="top-center"
            closeButton
            richColors
            duration={3000}
            expand={true}
          />
        </div>
      </body>
    </html>
  );
}
