import { auth } from "@/auth";
import UniqueUrlForm from "@/components/dashBoardUrlForm";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import React from "react";

const Dashboard: React.FC = async () => {
  const session = await auth();
  const user = session?.user;
  // console.log(user)

  return (
    <div className="px-5 mt-6 flex flex-col gap-8">
      <Card className="h-14 w-8xl flex flex-col justify-center">
        <CardHeader>
          <h1 className="text-md font-medium mt-1">Welcome, {user?.name}</h1>
        </CardHeader>
      </Card>
      
      <Card className= "max-w-8xl flex flex-col justify-center">
        <CardHeader>
          <h1 className="text-md font-semibold mt-1 pb-0">Your unique Link</h1>
        </CardHeader>
        <CardContent>
          <UniqueUrlForm defaultUsername={user?.username}/>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
