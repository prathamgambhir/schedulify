import { Avatar} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarClock} from "lucide-react";
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

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center lg:text-left">
          {event?.title.toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3 items-center p-2 rounded-lg bg-slate-50">
          <Avatar className="w-12 h-12 border border-slate-200">
            <Image
              src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXzsztRhsJQRJSSsLJzqPAp_f7yyr0BL51Q&s"}
              alt="user avatar"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              {user?.name?.toUpperCase()}
            </p>
            <p className="text-xs font-medium text-slate-500">
              @{user?.username}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Description</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {event?.description || "No description provided."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
              <CalendarClock size={16} />
              {event?.duration} mins
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg"
                alt="Meet"
                className="w-4 h-4"
              />
              Google Meet
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventDetails;