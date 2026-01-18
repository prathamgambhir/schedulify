"use client";

import { getLatestMeetUpdates } from "@/actions/dashboardAction";
import { Spinner } from "@/components/ui/spinner";
import useFetch from "@/hooks/use-fetch";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UpcomingMeets = () => {
  const router = useRouter();
  const {
    fn: fnLatestMeetUpdates,
    loading,
    data: upcomingmeets,
  } = useFetch(getLatestMeetUpdates);

  useEffect(() => {
    (async () => await fnLatestMeetUpdates())();
    // console.log("doneee useeeeee effectttttt");
  });

  //   console.log(upcomingmeets);
  return (
    <>
      {loading ? (
        <p className="flex gap-1 items-center justify-center mt-6">
          <Spinner />
          Loading
        </p>
      ) : upcomingmeets && upcomingmeets?.length > 0 ? (
        <div className="flex flex-col gap-4 md:gap-6">
          {upcomingmeets?.map((meet) => (
            <div
              key={meet.id}
              className="h-auto md:h-16 rounded-lg p-3 md:p-2 flex flex-col justify-center border border-neutral-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => router.push("/meetings")}
            >
              <div className="font-semibold text-sm md:text-base">{meet.event.title}</div>
              <div className="text-xs md:text-sm font-light">
                with {meet.name} on{" "}
                {format(new Date(meet.startTime), "MMMM d, yyyy (h:mm a)")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-sm md:text-base font-light">No meetings scheduled</p>
      )}
    </>
  );
};

export default UpcomingMeets;
