"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getUserMeetings = async (type: string) => {
  const session = await auth();

  const user = session?.user;

  if (!session || !user) {
    throw new Error("user not authenticated");
  }

  const now = new Date();

  const meetings = await prisma.booking.findMany({
    where: {
      userId: user.id,
      startTime: type === "upcoming" ? { gte: now } : { lt: now },
    },
    include: {
      event: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      startTime: type === "upcoming" ? "asc" : "desc",
    },
  });

//   console.log(meetings);
  return meetings;
};

const cancelMeeting = async (meetingId: string) => {
    const session = await auth();
    const user = session?.user

    if(!user || !session){
        throw new Error("User not authenticated")
    }

    const meeting = await prisma.booking.findUnique({
        where: {
            id: meetingId
        },
        include:{
            event: true,
            user: true
        }
    })

    if(!meeting || meeting.userId != user.id){
        throw new Error("Meeting not found or unauthorized")
    }

    
}