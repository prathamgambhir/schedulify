"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signout } from "@/actions/authAction";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import Image from "next/image";

const AuthContent = () => {
  const session = useSession();
  if(session.status === "loading") return null;

  return session.data?.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <Avatar className="w-8 h-8 mr-2 flex jutify-center items-center cursor-pointer">
            <Image
                src={session.data.user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXzsztRhsJQRJSSsLJzqPAp_f7yyr0BL51Q&s"}
                alt ="user avatar"
                width={32}
                height={32}
                className="rounded-full"
            ></Image>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-semibold h-8 pl-6">
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={signout}>
            <Button type="submit" variant={"ghost"} className="h-4 ">
              SignOut <LogOutIcon />
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href={"/login"}>
      <Button className="cursor-pointer">Login</Button>
    </Link>
  );
};

export default AuthContent;
