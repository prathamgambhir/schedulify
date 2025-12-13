import { getUserByUsername } from "@/actions/userAction";
import EventCard from "@/components/event-card";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardHeader
} from "@/components/ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface UserPage {
  params: {
    username: string;
  };
}

const UserPage: React.FC<UserPage> = async ({ params }) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) notFound();

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex gap-8 ">
              <Avatar className="w-auto h-auto mr-2 flex jutify-center items-center cursor-pointer">
                <Image
                  src={
                    user.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXzsztRhsJQRJSSsLJzqPAp_f7yyr0BL51Q&s"
                  }
                  alt="user avatar"
                  width={100}
                  height={100}
                  className="rounded-full"
                ></Image>
              </Avatar>
              <div className="flex flex-col gap-4">
                <div className="text-lg font-bold ">{(user.name)?.toUpperCase()}</div>
                <div className="text-sm font-semibold opacity-75 ">Welcome to my scheduling page. Please select an event below to book a
          call with me.</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="m-4 p-4 text-center font-bold text-xl opacity-75 ">
        My Events
      </div>

      {user.events.length === 0 ? (
        <p className="flex justify-center items-center text-md font-semibold opacity 75 m-16">
          No public Events available
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-3">
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
