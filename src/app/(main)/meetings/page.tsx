import { getUserMeetings } from "@/actions/meetingsAction";
import MeetList from "@/components/meeting/meet-list";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, { Suspense } from "react";

const Meeting = async () => {
  return (
    <div className="p-5">
      <Tabs defaultValue="upcoming" className="">
        <TabsList className="text-sm font-bold bg-slate-50 border border-black/10 shadow-sm">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-black data-[state=active]:text-white transition-all duration-50">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-black data-[state=active]:text-white ">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<p className="my-4 mx-2 text-sm font-bold flex items-center gap-2"><Spinner/> Loading upcoming meetings ...</p>}>
            <UpcomingMeets />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback={<p className="my-4 mx-2 text-sm font-bold flex items-center gap-2"><Spinner/> Loading past meetings ...</p>}>
            <PastMeets />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const UpcomingMeets = async () => {
  const meetings = await getUserMeetings("upcoming");

  return (
    <>
      <MeetList meetings={meetings} type="upcoming" />
    </>
  );
};

const PastMeets = async () => {
  const meetings = await getUserMeetings("past");

  return (
    <>
      <MeetList meetings={meetings} type="past" />
    </>
  );
};

export default Meeting;
