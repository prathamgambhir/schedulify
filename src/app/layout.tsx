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
  title: {
    default: "Schedulify - Smart Meeting Scheduling Platform",
    template: "%s | Schedulify",
  },
  description:
    "Schedulify is a smart meeting scheduling platform that simplifies booking meetings. Create events, manage availability, and schedule meetings effortlessly.",
  keywords: [
    "scheduling",
    "meeting scheduler",
    "calendar",
    "booking",
    "events",
    "appointments",
    "productivity",
    "time management",
  ],
  authors: [{ name: "Pratham Gambhir" }],
  creator: "Pratham Gambhir",
  metadataBase: new URL("https://scheduulify.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scheduulify.vercel.app",
    title: "Schedulify - Smart Meeting Scheduling Platform",
    description:
      "Schedule meetings effortlessly with Schedulify. Create events, manage availability, and book meetings in seconds.",
    siteName: "Schedulify",
    images: [
      {
        url: "/fav-logo.png",
        width: 512,
        height: 512,
        alt: "Schedulify Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedulify - Smart Meeting Scheduling Platform",
    description:
      "Schedule meetings effortlessly with Schedulify. Create events, manage availability, and book meetings in seconds.",
    images: ["/fav-logo.png"],
    creator: "@_PrathamGambhir",
  },
  icons: {
    icon: "/fav-logo.png",
    shortcut: "/fav-logo.png",
    apple: "/fav-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
