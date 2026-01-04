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
    error,
    data: upcomingmeets,
  } = useFetch(getLatestMeetUpdates);

  useEffect(() => {
    (async () => await fnLatestMeetUpdates())();
    // console.log("doneee useeeeee effectttttt");
  }, []);

  //   console.log(upcomingmeets);
  return (
    <>
      {loading ? (
        <p className="flex gap-1 items-center justify-center mt-6">
          <Spinner />
          Loading
        </p>
      ) : upcomingmeets && upcomingmeets?.length > 0 ? (
        <div className="flex flex-col gap-6 ">
          {upcomingmeets?.map((meet) => (
            <div
              key={meet.id}
              className="h-16 rounded-lg p-2 flex flex-col justify-center border border-neutral-100 shadow-sm"
              onClick={() => router.push("/meetings")}
            >
              <div className="font-semibold text-sm">{meet.event.title}</div>
              <div className="text-xs font-light">
                with {meet.name} on{" "}
                {format(new Date(meet.startTime), "MMMM d, yyyy (h:mm a)")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-sm font-light ">No meetings scheduled</p>
      )}
    </>
  );
};

export default UpcomingMeets;
