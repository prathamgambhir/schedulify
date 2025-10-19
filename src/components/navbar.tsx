"use client";

import React from "react";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import Link from "next/link";
import AuthContent from "./authContent";
import Image from "next/image";
import NavLogo from "../../public/nav-logo.jpg";
import { usePathname } from "next/navigation";
import CreateEventDialog from "./createEvent";
import { useSession } from "next-auth/react";

const navLinks = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/availability", label: "Availability" },
  { path: "/events", label: "Events" },
  { path: "/meetings", label: "Meetings" },
];

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const isLanding =
    pathname === "/" || pathname == "/login" || pathname == "/signup";

  return (
    <header className="w-full flex justify-center items-center sticky top-8 lg:mb-12 z-50">
      <div className="w-full sticky h-18 top-2 bg-white/80 backdrop-blur-sm shadow-md border border-black/15 shadow-black/10 rounded-xl flex px-4 py-2 justify-between items-center">
        <Link href={"/"}>
          <Image
            src={NavLogo}
            alt="logo"
            width={150}
            height={60}
            className="cursor-pointer mt-[3px]"
          ></Image>
        </Link>
        {isLanding ? (
          session.data?.user ? (
            <div className="w-[64%] flex items-center justify-between">
              <div className="flex gap-8 items-center">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    className={`text-md font-normal ${
                      pathname == link.path ? "text-blue-700 font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex gap-4">
                <Link href={"/events?create=true"}>
                  <Button variant={"outline"} className="cursor-pointer">
                    <PenBox />
                    <CreateEventDialog />
                  </Button>
                </Link>
                <AuthContent />
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href={"/events?create=true"}>
                <Button variant={"outline"} className="cursor-pointer">
                  <PenBox />
                  <CreateEventDialog />
                </Button>
              </Link>
              <AuthContent />
            </div>
          )
        ) : (
          <div className="w-[64%] flex items-center justify-between">
            <div className="flex gap-8 items-center">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={`text-md font-normal ${
                    pathname == link.path ? "text-blue-700 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-4">
              <Link href={"/events?create=true"}>
                <Button variant={"outline"} className="cursor-pointer">
                  <PenBox />
                  <CreateEventDialog />
                </Button>
              </Link>
              <AuthContent />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
