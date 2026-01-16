import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Footer from "@/components/ui/footer";
import ToasterProvider from "@/components/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Schedular",
  description: "Meetings scheduler app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Suspense>
            <main
              className="min-h-screen px-2 lg:px-20"
            >
              <Navbar />
              {children}
            </main>
            <Footer />
            <ToasterProvider />
          </Suspense>
        </SessionProvider>
      </body>
    </html>
  );
}
