"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Trash, Link2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteEvent } from "@/actions/eventAction";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import toast from "react-hot-toast";

interface EventCard {
  event: {
    _count: {
      bookings: number;
    };
  } & {
    title: string;
    description: string | null;
    duration: number;
    isPrivate: boolean;
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
  };
  username: string;
  isPublicPage?: boolean;
}

const EventCard: React.FC<EventCard> = ({
  event,
  username,
  isPublicPage = false,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      throw new Error("unable to copy url");
    }
  };

  const { fn: fnDeleteEvent, loading} = useFetch(deleteEvent);
  const handleDelete = async () => {
    if (
      window.confirm(`Sure you want to delete the Event : "${event.title}"`)
    ) {
      await fnDeleteEvent(event.id);

      toast.success('Event deleted')
      
      router.refresh();
    }
  };

  return (
    <div>
      <Card className="w-full h-auto md:h-64 flex flex-col">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            <Link
              href={`${origin}/${username}/${event.id}`}
              target="_blank"
              className="hover:text-blue-600 transition-colors"
            >
              {event.title}
            </Link>
          </CardTitle>
          <CardDescription className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs md:text-sm">
            <span>{`${event.duration} mins | ${
              event.isPrivate ? "Private" : "Public"
            }`}</span>
            <span>{event._count.bookings} Bookings</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto h-20 md:h-24">
          <p className="text-sm">{event.description}</p>
        </CardContent>
        <CardFooter className="pt-2">
          {!isPublicPage && (
            <div className="mt-2 flex gap-2 w-full">
              <Button
                variant={"outline"}
                className={`flex-1 sm:flex-none ${isCopied ? "" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                onClick={handleCopy}
              >
                <Link2 className="w-4 h-4 mr-1" />
                {isCopied ? "Copied" : "Copy"}
              </Button>
              <Button variant={"destructive"} className="flex-1 sm:flex-none" onClick={handleDelete}>
                {loading ? (
                  <>
                    <Spinner />
                    <span className="ml-1">Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash className="w-4 h-4" />
                    <span className="ml-1 hidden sm:inline">Delete</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;

