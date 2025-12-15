import { getUserMeetings } from "@/actions/meetingsAction";
import MeetList from "@/components/meet-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";

const Meeting = async () => {
  return (
    <div className="p-5">
      <Tabs defaultValue="upcoming" className="">
        <TabsList className="text-sm font-bold bg-blue-300 border border-black/50">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback="Loading upcoming meets...." >
            <UpcomingMeets />
          </Suspense>
        </TabsContent>
        <TabsContent value="past">
          <Suspense fallback="Loading past meets.....">
            <PastMeets />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const UpcomingMeets = async() => {
  const meetings = await getUserMeetings("upcoming");

  return(
    <>
      <MeetList meetings={meetings} type="upcoming"/>
    </>
  )
}

const PastMeets = async() => {
  const meetings = await getUserMeetings("past");

  return(
    <>
      <MeetList meetings={meetings} type="past"/>
    </>
  )
}

export default Meeting;
