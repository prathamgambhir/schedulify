import { auth } from "@/auth";
import UniqueUrlForm from "@/components/dashboard/dashBoardUrlForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import UpcomingMeets from "./_components/upcoming-meets";
import SearchUsersSection from "./_components/other-users";

const Dashboard: React.FC = async () => {
  const session = await auth();
  const user = session?.user;
  // console.log(user)

  return (
    <div className="px-4 md:px-5 mt-6 flex flex-col gap-6 md:gap-8 pb-16">
      <Card className="h-14 w-full max-w-7xl flex flex-col justify-center">
        <CardHeader>
          <h1 className="text-lg md:text-xl font-medium mt-1">Welcome, {user?.name}</h1>
        </CardHeader>
      </Card>
      {/* Mobile: stacked, Desktop: side by side */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 w-full max-w-7xl">
        <div className="w-full lg:w-[75%] flex flex-col gap-4">
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <h1 className="text-md md:text-lg font-semibold mt-1 pb-0">
                Your unique Link
              </h1>
            </CardHeader>
            <CardContent>
              <UniqueUrlForm defaultUsername={user?.username} />
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-center">
            <CardHeader>
              <h1 className="text-lg text-center font-semibold mt-1 pb-0">
                Upcoming Meetings
              </h1>
            </CardHeader>
            <CardContent className="overflow-scroll max-h-64">
              <UpcomingMeets />
            </CardContent>
          </Card>
        </div>
        <div className="max-h-96 w-full lg:w-auto lg:flex-1 flex flex-col">
          <SearchUsersSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
