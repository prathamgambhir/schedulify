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
        <h1 className="text-5xl font-bold text-blue-950 p-6">
          {pathname.slice(1).toUpperCase()}
        </h1>
      ) : null}
      {children}
    </main>
  );
}
