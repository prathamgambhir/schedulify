import { auth } from "@/auth";
import UniqueUrlForm from "@/components/dashBoardUrlForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import UpcomingMeets from "./_components/upcoming-meets";
import SearchUsersSection from "./_components/other-users";

const Dashboard: React.FC = async () => {
  const session = await auth();
  const user = session?.user;
  // console.log(user)

  return (
    <div className="px-5 mt-6 flex flex-col gap-8 pb-16">
      <Card className="h-14 w-8xl flex flex-col justify-center">
        <CardHeader>
          <h1 className="text-md font-medium mt-1">Welcome, {user?.name}</h1>
        </CardHeader>
      </Card>
      <div className="flex gap-6">
        <div className="min-w-4xl flex flex-col gap-4">
          <Card className="max-h-52 flex flex-col justify-center">
            <CardHeader>
              <h1 className="text-md font-semibold mt-1 pb-0">
                Your unique Link
              </h1>
            </CardHeader>
            <CardContent>
              <UniqueUrlForm defaultUsername={user?.username} />
            </CardContent>
          </Card>
          <Card className="max-h-64 flex flex-col justify-center">
            <CardHeader>
              <h1 className="text-lg text-center font-semibold mt-1 pb-0">
                Upcoming Meetings
              </h1>
            </CardHeader>
            <CardContent>
              <UpcomingMeets />
            </CardContent>
          </Card>
        </div>
        <div className="min-h-96 flex flex-1 flex-col">
          <SearchUsersSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
