import { getUserEvents } from "@/actions/eventAction";
import EventCard from "@/components/event/event-card";
import React from "react";

const Events = async () => {
  const { userEvents, username } = await getUserEvents();

  if (userEvents.length === 0) {
    return (
      <p className="text-lg md:text-xl lg:text-2xl font-semibold opacity-80 text-center mt-16">
        You haven&apos;t created any events yet
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
      {userEvents?.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  );
};

export default Events;
