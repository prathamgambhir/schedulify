"use client";

import { getOtherUsers, getSearchedUser } from "@/actions/dashboardAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useFetch from "@/hooks/use-fetch";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const OtherUser: React.FC = () => {
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
        <div className="flex flex-col overflow-y-auto">
          {otherusers?.map((user) => (
            <div
              key={user.username}
              className="h-16 px-4 flex flex-col justify-center border border-neutral-200"
            >
              <div className="text-sm font-semibold flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={user?.image!}
                    className="bg-black text-white"
                  />
                  <AvatarFallback>
                    {user.name?.toUpperCase().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs">{user.name?.toUpperCase()}</p>
                  <p className="font-light text-xs">@{user.username}</p>
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
        <div className="flex flex-col overflow-y-auto">
          {searchedUser?.map((user) => (
            <div
              key={user.username}
              className="h-16 px-4 flex flex-col justify-center border border-neutral-200"
            >
              <div className="text-sm font-semibold flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={user?.image!}
                    className="bg-black text-white"
                  />
                  <AvatarFallback>
                    {user.name?.toUpperCase().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs">{user.name?.toUpperCase()}</p>
                  <p className="font-light text-xs">@{user.username}</p>
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
    <Card className="min-h-96 flex flex-1 flex-col">
      <CardHeader className="flex justify-start">
        <Input
          className="h-10 border border-neutral-200 shaadow-md"
          placeholder="Search users"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="bg-black/80 p-2 rounded-lg border border-neutral-200 shaadow-md">
          <SearchIcon className="text-white font-bold h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 mx-4 p-0 rounded-md border border-black-300 shadow-sm">
        {input.length >= 1 ? <SearchedUsers input={input} /> : <OtherUser />}
      </CardContent>
    </Card>
  );
};

export default SearchUsersSection;
