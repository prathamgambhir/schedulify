"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import EventForm from "./eventForm";

export default function CreateEventDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if(searchParams.get("create") === "true"){
      router.replace(window.location.pathname);
    }
    router.refresh()
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        <Button variant={"link"}>Create Event</Button>
      </DialogTitle>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details for your new event. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <EventForm handleClose={handleClose} />
        
        <DialogFooter className="flex px-5 justify-center items-start">
          <DialogClose asChild >
            <Button variant="outline" className="w-full font-semibold border hover:bg-red-500 hover:text-white hover:border-black/30" onClick={() => {
              setIsOpen(false)
              //here we used timeout as the url was not replacing as the react component needs to be unmounted 
              // first as durng unmount api calls fail 
              setTimeout(() => router.replace(window.location.pathname),1)
            }}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
