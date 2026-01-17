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
    <div className="container mx-auto px-4 pb-12">
      <div className="py-6 md:py-8 text-3xl md:text-4xl font-bold text-center text-blue-950">
        Book Your Slot
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Left Side: Event Details */}
        <div className="w-full lg:w-1/3">
          <EventDetails event={event} />
        </div>

        {/* Separator: Only visible on large screens */}
        <div className="hidden lg:block h-[500px]">
          <Separator orientation="vertical" className="border-black/20" />
        </div>

        {/* Right Side: Booking Form */}
        <div className="w-full lg:flex-1">
          <Suspense fallback={<div>Loading booking form...</div>}>
            <BookingForm event={event} availability={eventAvailability} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default EventBooinkgPage;