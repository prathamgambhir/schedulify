import { Spinner } from "@/components/ui/spinner";
import React, { Suspense } from "react";

export default function AvailabilityPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center gap-4">
          <Spinner />
          <p className="text-lg font-bold opacity-80">Loading...</p>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
