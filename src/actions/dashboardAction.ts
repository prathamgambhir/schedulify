"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getLatestMeetUpdates = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  //   console.log(user);

  const now = new Date();
  const upcomingMeetings = await prisma.booking.findMany({
    where: {
      userId: user?.id,
      startTime: { gte: now },
    },
    include: {
      event: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
    take: 3,
  });

  //   console.log(upcomingMeetings);
  return upcomingMeetings;
};

export const getOtherUsers = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const otherUsers = await prisma.user.findMany({
    where: {
      id: {
        not: user.id,
      },
    },
    select: {
      email: true,
      name: true,
      username: true,
      image: true,
    },
    orderBy: { name: "asc" },
    take: 10,
  });

  return otherUsers;
};

export const getSearchedUser = async (input: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!session || !userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const searchedUser = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: input,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: input,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      name: true,
      username: true,
      image: true,
    },
    orderBy: { name: "asc" },
  });
  // console.log(input)
  // console.log(searchedUser)

  return searchedUser;
};
