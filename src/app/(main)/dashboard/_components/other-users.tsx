"use client";

import { getOtherUsers, getSearchedUser } from "@/actions/dashboardAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useFetch from "@/hooks/use-fetch";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OtherUser: React.FC = () => {
  const router = useRouter();
  const {
    fn: fnGetOtherUsers,
    data: otherusers,
    loading,
  } = useFetch(getOtherUsers);

  useEffect(() => {
    (async () => await fnGetOtherUsers())();
  }, []);

  return (
    <>
      {loading ? (
        <p className="flex gap-1 items-center justify-center mt-6">
          <Spinner />
          Loading
        </p>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {otherusers?.map((user) => (
            <div
              key={user.username}
              className="h-auto md:h-16 px-3 md:px-4 py-2 md:py-0 flex flex-col justify-center border border-neutral-200 rounded-xl"
            >
              <div className="text-sm font-semibold flex gap-3 items-center" onClick={() => router.push(`/${user.username}`)}>
                <Avatar className="h-10 w-10 md:h-8 md:w-8">
                  <AvatarImage
                    src={user?.image!}
                    className="bg-black text-white cursor-pointer"
                  />
                  <AvatarFallback className="text-xs">
                    {user.name?.toUpperCase().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs md:text-sm cursor-pointer">{user.name?.toUpperCase()}</p>
                  <p className="font-light text-xs cursor-pointer">@{user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

interface searchedUser {
  input: string;
}

const SearchedUsers: React.FC<searchedUser> = ({ input }) => {
  const router = useRouter()
  const {
    fn: fnGetSearchedUser,
    data: searchedUser,
    loading,
  } = useFetch(getSearchedUser);

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
    // Check if input isn't empty to avoid unnecessary API calls
    if (input) {
      (async () => await fnGetSearchedUser(input))();
    }
  }, 300);

    // (async () => await fnGetSearchedUser(input))();
    // console.log("Initiatweddd search" + input)

    return () => clearTimeout(delayInputTimeout)
  }, [input]);

  // console.log(searchedUser)
  return (
    <>
      {loading ? (
        <p className="flex gap-1 items-center justify-center mt-6">
          <Spinner />
          Loading
        </p>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {searchedUser?.map((user) => (
            <div
              key={user.username}
              className="h-auto md:h-16 px-3 md:px-4 py-2 flex flex-col justify-center border border-neutral-200 rounded-md"
            >
              <div className="text-sm font-semibold flex gap-3 items-center" onClick={() => router.push(`/${user.username}`)}>
                <Avatar className="h-10 w-10 md:h-8 md:w-8">
                  <AvatarImage
                    src={user?.image!}
                    className="bg-black text-white cursor-pointer"
                  />
                  <AvatarFallback className="text-xs">
                    {user.name?.toUpperCase().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs md:text-sm cursor-pointer">{user.name?.toUpperCase()}</p>
                  <p className="font-light text-xs cursor-pointer">@{user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const SearchUsersSection = () => {
  const [input, setInput] = useState<string>("");
  return (
    <Card className="h-auto md:min-h-96 flex flex-1 flex-col">
      <CardHeader className="flex justify-start space-y-0 gap-2">
        <Input
          className="h-10 md:h-10 border border-neutral-200 shadow-md"
          placeholder="Search users"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="bg-black/80 p-2 rounded-lg border border-neutral-200 shadow-md">
          <SearchIcon className="text-white font-bold h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 mx-2 md:mx-4 p-0 max-h-60 md:max-h-96 overflow-scroll mask-b-from-80%">
        {input.length >= 1 ? <SearchedUsers input={input} /> : <OtherUser />}
      </CardContent>
    </Card>
  );
};

export default SearchUsersSection;
