"use server"

import prisma from "@/lib/prisma";
import { google } from "googleapis";

interface CreateBookingPayload {
  eventId: string;
  name: string;
  email: string;
  startTime: string;
  endTime: string;
  additionalInfo?: string;
}

export const createBooking = async (bookingData: CreateBookingPayload) => {
  try {
    const event = await prisma.event.findFirst({
      where: {
        id: bookingData.eventId,
      },
      include: {
        user: true,
      },
    });
    if (!event) {
      throw new Error("Event not found");
    }

    const owner = event?.user;
    if (!owner) {
      throw new Error("User not found");
    }

    const refreshToken = owner.googleRefreshToken;
    if (!refreshToken) {
      throw new Error("User not linked with google account");
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID as string,
      process.env.AUTH_GOOGLE_SECRET as string
    );

    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const tokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = tokenResponse.token ?? tokenResponse;

    const calender = google.calendar({ version: "v3", auth: oAuth2Client });

    const meetGenerateResponse = await calender.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name}-${event.title}`,
        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees: [{ email: bookingData.email }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = meetGenerateResponse.data.hangoutLink as string;
    const googleEventId = meetGenerateResponse.data.id as string;

    const booking = await prisma.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        meetLink,
        googleEventId
      }
    })

    return{success: true , booking, meetLink}
  } catch (error) {
    console.error("createBooking error", error);
    return { success: false, error: error};
  }
};
