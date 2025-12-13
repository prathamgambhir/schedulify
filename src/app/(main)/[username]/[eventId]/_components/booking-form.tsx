"use client";

import { bookingSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { addMinutes, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/actions/bookingAction";
import useFetch from "@/hooks/use-fetch";

type BookingFormValues = {
  name: string;
  email: string;
  additionalInfo?: string;
  date: Date | string;
  time: string;
};

interface BookingFormProps {
  event:
    | ({
        user: {
          name: string | null;
          username: string | null;
          image: string | null;
        };
      } & {
        id: string;
        title: string;
        description: string | null;
        duration: number;
        userId: string;
        isPrivate: boolean;
        createdAt: Date;
        updatedAt: Date;
      })
    | null;
  availability: Array<{
    date: string;
    slots: string[];
  }>;
}

const BookingForm: React.FC<BookingFormProps> = ({ event, availability }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
      time: undefined,
    },
  });

  const availabilityDays = availability.map((day) => new Date(day.date));
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const timeSlots = selectedDate
    ? availability.find((d) => d.date === format(selectedDate, "yyyy-MM-dd"))
        ?.slots || []
    : [];

  const {data: fnData, loading, fn: fnCreateBooking, error } = useFetch(createBooking);
  const onSubmit = async (data: BookingFormValues) => {
    if (!data.time || !data.date || !event?.duration) return;

    const startTime = new Date(
      `${format(data.date, "yyyy-MM-dd")}T${data.time}`
    );
    const endTime = new Date(addMinutes(startTime.getTime(), event?.duration));

    try {
      await fnCreateBooking({
        eventId: event.id,
        name: data.name,
        email: data.email,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        additionalInfo: data.additionalInfo,
      });

    } catch (error) {
      console.log("failed to submit slot booking form", error);
    }
  };

  if(fnData){
    return(
      <div className="col-span-16 border border-black/50 bg-white rounded-md flex flex-col justify-center items-center pb-12">
        <h2 className="text-2xl font-bold p-4 m-2">Booking Sucessfull !!</h2>
        {fnData.meetLink && (
          <div className="flex gap-2 text-sm font-semibold ">
            <h2>Here's your meeting link :</h2>
            <a href={fnData.meetLink} target="_blank" className="text-blue-600 underline text-md"> Join Google Meet</a>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-span-16">
      <div className="flex gap-2 col-span-16">
        <div>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={field.value as Date}
                onSelect={field.onChange}
                disabled={[{ before: new Date() }]}
                modifiers={{ available: availabilityDays }}
                className="rounded-md border border-black/50 shadow-md"
                classNames={{
                  day: "m-1",
                }}
                modifiersClassNames={{
                  available: "bg-blue-400 rounded-lg border border-black",
                }}
              />
            )}
          />
        </div>
        {selectedDate && (
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <div className="bg-white rounded-md w-full p-5 border border-black/50 shadow-lg">
                <h3 className="mb-2 font-bold text-xl flex justify-center items-center">
                  Available Time Slots
                </h3>
                {timeSlots.length > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={field.value === slot ? "default" : "outline"}
                          onClick={() => field.onChange(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center text-sm font-xl font-semibold mt-8">
                    no available time slots for this day
                  </div>
                )}
              </div>
            )}
          />
        )}
      </div>
      <div className="mt-4 ">
        {selectedTime && (
          <div className="flex flex-col gap-2 bg-white shadow-md mt-4 p-4 pt-2 justify-center items-center border border-black/75 rounded-md">
            <h2 className="text-xl font-bold underline p-2 mb-2">
              Fill this Form
            </h2>
            <div className="col-span-3 flex flex-col gap-2 w-full">
              <div>
                <Input {...register("name")} placeholder="Enter your name" />
                {errors.name && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Input {...register("email")} placeholder="Enter your email" />
                {errors.email && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div>
                <Textarea
                  {...register("additionalInfo")}
                  placeholder="Enter additional information"
                />
                {errors.additionalInfo && (
                  <p className="text-red-500 text-sm font-semibold">
                    {errors?.additionalInfo?.message}
                  </p>
                )}
              </div>
              <Button variant={"default"} disabled={loading} type="submit">
                {loading ? <p>Booking your slot...</p> : <p>Schedule Event</p>}
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
