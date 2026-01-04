import { getUserMeetings } from "@/actions/meetingsAction";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { format } from "date-fns";
import Image from "next/image";
import CancelMeetingButton from "./cancel-meeting-button";

interface Eventuser {
  name: string | null;
  email: string | null;
}

interface EventDetails {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  duration: number;
  isPrivate: boolean;
  user: Eventuser;
}

interface MeetingBooking {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  additionalInfo: string | null;
  startTime: Date;
  endTime: Date;
  meetLink: string;
  googleEventId: string;
  createdAt: Date;
  updatedAt: Date;
  //nested the event here and inside event the user interface
  event: EventDetails;
}

type MeetingArray = MeetingBooking[];

type meetListProps = {
  meetings: MeetingArray;
  type: "upcoming" | "past";
};

const MeetList: React.FC<meetListProps> = ({ meetings, type }) => {
  if (meetings.length === 0) {
    return (
      <p className="text-xl font-semibold my-5 mx-1">
        No {type} meetings found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="my-2 min-h-64 w-auto">
          <CardHeader>
            <CardTitle className="font-semibold">
              {meeting.event.title}
            </CardTitle>
            <CardDescription>
              with {meeting.name} on{" "}
              {format(new Date(meeting.startTime), "MMMM d, yyyy (h:mm a)")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-md font-medium">
              Description :{" "}
              <span className="text-sm font-light">
                {meeting.event.description}
              </span>
            </p>
            {meeting.additionalInfo && (
              <p className="text-md font-medium">
                Additional Info :{" "}
                <span className="text-sm font-light">
                  {meeting.additionalInfo}
                </span>
              </p>
            )}

            {meeting.meetLink && (
              <div className="flex gap-2 items-center text-sm font-medium my-2">
                <Image
                  src="data:image/png;base64,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"
                  alt="G-meet icon"
                  className="h-4 w-4"
                  height={5}
                  width={5}
                />
                <a
                  href={meeting.meetLink}
                  className="text-blue-400 underline"
                  target="_blank"
                >
                  {" "}
                  Google Meet Link
                </a>
              </div>
            )}
          </CardContent>
          {type === "upcoming" && (
            <CardFooter>
              <CancelMeetingButton meetingId={meeting.id}/>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
};

export default MeetList;
