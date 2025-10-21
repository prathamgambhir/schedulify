import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import Events from "./page";

function EventPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center gap-4">
          <Spinner />
          <p className="text-lg font-bold opacity-80">Loading Events</p>
        </div>
      }
    >
      <div className="px-5 mt-6 pb-12">
        <Events />
      </div>
    </Suspense>
  );
}

export default EventPage;