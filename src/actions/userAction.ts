"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const updateUsername = async (username: string) => {
  if(typeof username !== "string"){
    throw new Error("Invalid Username")
  }

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsername && existingUsername.id !== userId) {
    throw new Error("Username already taken");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { username },
  });

  return { success: true };
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {username: username},
    select: {
      id: true, 
      name: true,
      email: true,
      image: true,
      events: {
        where: {
          isPrivate: false
        },
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: true,
          duration: true,
          title: true,
          description: true,
          isPrivate: true,
          _count: {
            select: {bookings: true}
          }
        }
      }
    }
  })

  return user;
}