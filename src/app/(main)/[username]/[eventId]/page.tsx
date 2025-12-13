import { getEventDetails } from "@/actions/eventAction";
import React, { Suspense } from "react";
import EventDetails from "./_components/event-detials";
import { Separator } from "@/components/ui/separator";
import BookingForm from "./_components/booking-form";
import { getEventAvailability } from "@/actions/availabilityAction";
import { notFound } from "next/navigation";

interface eventBookingProps {
  params: {
    username: string;
    eventId: string;
  };
}

const EventBooinkgPage: React.FC<eventBookingProps> = async ({ params }) => {
  const { eventId, username } = await params;
  const event = await getEventDetails(eventId, username);
  const eventAvailability = await getEventAvailability(eventId);

  if (!event) {
    notFound();
  }
  return (
    <div className="pb-18">
      <div className="my-12 mt-18 text-4xl font-bold text-center text-blue-950">
        Book Your Slot
      </div>
      <div className="grid grid-cols-25 gap-2 mx-12">
        <EventDetails event={event} />
        <div className="col-span-1">
          <Separator
            className="text-black-700 border border-black/60 justify-self-center"
            orientation="vertical"
          />
        </div>
        <Suspense fallback={<div>Loading booking form...</div>}>
          <BookingForm event={event} availability={eventAvailability} />
        </Suspense>
      </div>
    </div>
  );
};

export default EventBooinkgPage;
