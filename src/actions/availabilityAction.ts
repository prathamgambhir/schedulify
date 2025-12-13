"use server";

import { weekdays } from "@/app/(main)/availability/data";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";
import {
  format,
  addDays,
  startOfDay,
  parseISO,
  isBefore,
  addMinutes,
} from "date-fns";

type DayAvailability = {
  isAvailable: boolean;
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "17:00"
};

export type availabilityDataType = {
  timeGap: number; // Duration in minutes
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
};

interface Booking {
  startTime: Date;
  endTime: Date;
}

export const getAvailabilityData = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!session || !userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      availability: {
        include: {
          days: true,
        },
      },
    },
  });

  if (!user || !user.availability) {
    return null;
  }

  const availabilityData: Partial<availabilityDataType> = {
    timeGap: user.availability.timeGap,
  };

  weekdays.forEach((day) => {
    const dayAvailability = user.availability?.days.find(
      (db) => db.day === day.toUpperCase()
    );

    availabilityData[day] = {
      isAvailable: !!dayAvailability,
      startTime: dayAvailability
        ? dayAvailability.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: dayAvailability
        ? dayAvailability.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return availabilityData as availabilityDataType;
};

export const updateAvailability = async (data: availabilityDataType) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!session || !userId) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      availability: true,
    },
  });

  if (!user) {
    throw new Error("User not Found!");
  }

  const updatedAvailabilityData = Object.entries(data).flatMap(
    ([key, value]) => {
      if (key === "timeGap") return [];

      const day = key.toUpperCase();

      const v = value as DayAvailability;

      if (!v || !v.isAvailable) return [];

      const baseDate = new Date().toISOString().split("T")[0];
      return [
        {
          day: day as DayOfWeek,
          startTime: new Date(`${baseDate}T${v.startTime}:00Z`),
          endTime: new Date(`${baseDate}T${v.endTime}:00Z`),
        },
      ];
    }
  );

  if (user.availability) {
    await prisma.availability.update({
      where: { id: user.availability.id },
      data: {
        timeGap: data.timeGap,
        days: {
          deleteMany: {},
          create: updatedAvailabilityData,
        },
      },
    });
  } else {
    await prisma.availability.create({
      data: {
        userId: user.id,
        timeGap: data.timeGap,
        days: {
          create: updatedAvailabilityData,
        },
      },
    });
  }

  return { success: true };
};

export const getEventAvailability = async (eventId: string) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!event || !event.user.availability) return [];

  const { availability, bookings } = event.user;

  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30);

  const availableDatesandSlots = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const dayAvailability = availability.days.find((d) => d.day === dayOfWeek);

    if (dayAvailability) {
      const formatedDate = format(date, "yyyy-MM-dd");

      const slots = await getEventAvailabilitySlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        availability.timeGap,
        bookings,
        formatedDate
      );

      availableDatesandSlots.push({
        date: formatedDate,
        slots,
      });
    }
  }

  return availableDatesandSlots;
};

export const getEventAvailabilitySlots = async (
  startTime: Date, //day availability start time
  endTime: Date, // day availablility end time
  duration: number,
  timeGap: number,
  bookings: Booking[],
  formatedDate: string
): Promise<string[]> => {
  const slots: string[] = [];

  let slotStartTime = parseISO( 
    `${formatedDate}T${startTime.toISOString().slice(11, 16)}`
  );
  const slotEndTime = parseISO( //availability end time
    `${formatedDate}T${endTime.toISOString().slice(11, 16)}`
  );

  const currentDateAndTime = new Date();
  if (format(currentDateAndTime, "yyyy-MM-dd") === formatedDate) {
    if (isBefore(slotStartTime, currentDateAndTime)) {
      slotStartTime = addMinutes(currentDateAndTime, timeGap);
    }
  }

  while (slotStartTime < slotEndTime) {
    const slotEnd = addMinutes(slotStartTime, duration);

    const isSlotAvailable = !bookings.some((booking) => {
      return (
        // checking if slot starts inside another booking
        (slotStartTime >= booking.startTime &&
          slotStartTime < booking.endTime) ||
        // checking if slot ends inside another booking
        (slotEnd >= booking.startTime && slotEnd < booking.endTime) ||
        // checking if slot fully covers a booking
        (slotStartTime <= booking.startTime && slotEnd >= booking.endTime)
      );
    });

    if (isSlotAvailable) {
      slots.push(format(slotStartTime, "HH:mm"));
    }

    slotStartTime = slotEnd; 
  }

  return slots;
};
