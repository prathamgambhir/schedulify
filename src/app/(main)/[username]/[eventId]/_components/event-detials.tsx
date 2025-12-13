import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock, Clock, Clock3, ClockAlertIcon } from "lucide-react";
import Image from "next/image";

export interface EventDetailsProps {
  event:
    | ({
        user: {
          name: string | null;
          username: string | null;
          image: string | null;
        };
      } & {
        id: string;
        title: string;
        description: string | null;
        duration: number;
        userId: string;
        isPrivate: boolean;
        createdAt: Date;
        updatedAt: Date;
      })
    | null;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  const user = event?.user;
  //   console.log(event)

  return (
    <Card className="col-span-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          {event?.title.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-1 items-center mb-4 pl-1">
          <Avatar className="w-12 h-12 flex jutify-center items-center cursor-pointer">
            <Image
              src={
                user?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXzsztRhsJQRJSSsLJzqPAp_f7yyr0BL51Q&s"
              }
              alt="user avatar"
              width={40}
              height={40}
              className="rounded-full"
            ></Image>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-black/80">
              {user?.name?.toUpperCase()}
            </p>
            <p className="text-xs font-semibold text-black/40 ">
              @{user?.username}
            </p>
          </div>
        </div>
        <div className="p-2 flex flex-col gap-4">
          <p className="text-sm font-normal ">
            <span className="text-sm font-semibold">Description</span> :{" "}
            {event?.description}
          </p>
          <div className="text-sm font-semibold flex items-center gap-1">
            <CalendarClock size={18} />
            {event?.duration}mins
          </div>
          <div className="text-sm font-semibold flex items-center gap-1 ">
            <img
              src="data:image/png;base64,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"
              alt="G-meet icon"
              height={18}
              width={18}
            />
            Google Meet
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetails;
