"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Link, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteEvent } from "@/actions/eventAction";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

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
    createdAt: Date;
    updatedAt: Date;
    userId: string;
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
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      throw new Error("unable to copy url");
    }
  };

  const { fn: fnDeleteEvent, loading } = useFetch(deleteEvent);
  const handleDelete = async () => {
    if (window.confirm(`Sure you want to delete the Event : "${event.title}"`)) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };

  return (
    <div>
      <Card className="w-full h-64">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription className="flex justify-between">
            <span>{`${event.duration} mins | ${event.isPrivate}`}</span>
            <span>{event._count.bookings} Bookings</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-24 overflow-y-auto">
          <p>{event.description}</p>
        </CardContent>
        <CardFooter>
          {!isPublicPage && (
            <div className="mt-2 flex gap-2">
              <Button
                variant={"outline"}
                className={isCopied ? "" : "bg-blue-500 text-white"}
                onClick={handleCopy}
              >
                <Link />
                {isCopied ? "Copied" : "Copy Link"}
              </Button>
              <Button variant={"destructive"} onClick={handleDelete}>
                {loading ? (
                  <>
                    <Spinner />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash />
                    Delete
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
