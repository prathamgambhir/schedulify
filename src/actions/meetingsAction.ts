"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { google } from "googleapis";

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

export const cancelMeeting = async (meetingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) {
    throw new Error("User not authenticated");
  }

  const meeting = await prisma.booking.findUnique({
    where: {
      id: meetingId,
    },
    include: {
      event: true,
      user: true,
    },
  });

  if (!meeting || meeting.userId != user.id) {
    throw new Error("Meeting not found or unauthorized");
  }

  const owner = meeting.user;
  // console.log(owner);
  const refreshToken = owner.googleRefreshToken;
  if (!refreshToken) {
    throw new Error("User not linked with google");
  }

  const oAuth2Client = await new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID as string,
    process.env.AUTH_GOOGLE_SECRET as string
  );

  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  const tokenResponse = await oAuth2Client.getAccessToken();
  const accessToken = tokenResponse.token ?? tokenResponse;

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId: meeting.googleEventId,
      sendNotifications: true,
    });
  } catch (error) {
    console.error("unable to delete event from Google Calendar:", error);
  }

  await prisma.booking.delete({
    where: { id: meetingId },
  });

  return { success: true };
};
