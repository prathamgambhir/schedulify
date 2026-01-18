import { getUserByUsername } from "@/actions/userAction";
import EventCard from "@/components/event/event-card";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardHeader
} from "@/components/ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
              <Avatar className="w-24 h-24 sm:size-28 flex justify-center items-center cursor-pointer">
                <Image
                  src={
                    user.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXzsztRhsJQRJSSsLJzqPAp_f7yyr0BL51Q&s"
                  }
                  alt="user avatar"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              </Avatar>
              
              <div className="flex flex-col gap-2 sm:gap-4 sm:py-3">
                <h1 className="text-xl sm:text-2xl font-bold">
                  {user.name?.toUpperCase()}
                </h1>
                <p className="text-sm font-semibold opacity-75 max-w-md">
                  Welcome to my scheduling page. Please select an event below to book a call with me.
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="my-8 text-center font-bold text-xl opacity-75">
        My Events
      </div>

      {user.events.length === 0 ? (
        <p className="text-center text-md font-semibold opacity-75 py-20">
          No public Events available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              username={username}
              isPublicPage
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;