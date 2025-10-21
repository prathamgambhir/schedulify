import { getUserEvents } from "@/actions/eventAction";
import EventCard from "@/components/event-card";
import React from "react";

const Events = async () => {
  const { userEvents, username } = await getUserEvents();

  if (userEvents.length === 0) {
    return (
      <p className="text-lg lg:text-2xl font-semibold opacity-80 text-center mt-16">
        You haven't created any events yet
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 grid-cols-3 gap-6">
      {userEvents?.map((event) => (
        <EventCard key={event.id} event={event} username={username} />
      ))}
    </div>
  );
};

export default Events;