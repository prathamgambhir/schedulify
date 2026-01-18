"use server";

import { auth } from "@/auth";
import { EventFormType } from "@/components/event/eventForm";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

export const createEventAction = async (formdata: EventFormType) => {
  const validateData = eventSchema.parse(formdata);

  const session = await auth();
  const userId = session?.user.id;

  if (!session || !userId) {
    throw new Error("User not authenticated");
  }

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const event = await prisma.event.create({
    data: {
      ...validateData,
      userId: userId,
    },
  });
  revalidatePath("/events");
  return event;
};

export const getUserEvents = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!session || !userId) {
    throw new Error("User not authenticated");
  }

  try {
    const userEvents = await prisma.event.findMany({
      where: { userId: userId },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    return { userEvents, username: session.user.username };
  } catch (error) {
    throw new Error(`Unable to fetch Events ${error}`);
  }
};

export const deleteEvent = async (eventId: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId || !session) {
    throw new Error("User not authenticated");
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || !eventId || !(event.id === eventId)) {
    throw new Error("Event not found");
  }

  try {
    await prisma.event.delete({
      where: { id: eventId },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};

export const getEventDetails = async (eventId: string, username: string) => {
    const event = await prisma.event.findFirst({
        where: {
            id: eventId,
            user: {
                username: username
            }
        },
        include: {
            user:{
                select: {
                    name: true,
                    username: true,
                    image: true
                }
            }
        }
    });

    return event;
};
