"use client";

import { usePathname } from "next/navigation";
import React from "react";

const titlePathnames = ["/dashboard", "/events", "/availability", "/meetings"]

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const shouldShowTitle = titlePathnames.includes(pathname)

  return (
    <main>
      {shouldShowTitle ? (
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-blue-950 px-6 py-2 lg:p-6">
          {pathname.slice(1).toUpperCase()}
        </h1>
      ) : null}
      {children}
    </main>
  );
}
