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
import toast from "react-hot-toast";

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
    defaultValues: { date: undefined, time: undefined },
  });

  const availabilityDays = availability.map((day) => new Date(day.date));
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const timeSlots = selectedDate
    ? availability.find((d) => d.date === format(selectedDate, "yyyy-MM-dd"))
        ?.slots || []
    : [];

  const {
    data: fnData,
    loading,
    fn: fnCreateBooking,
  } = useFetch(createBooking);

  const onSubmit = async (data: BookingFormValues) => {
    // console.log(data);
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
      toast.success("Meeting scheduled successfully");
    } catch (error) {
      console.log("failed to submit slot booking form", error);
    }
    
    // console.log(fnData);
  };

  if (fnData) {
    return (
      <div className="w-full flex flex-col items-center justify-center border border-slate-200 bg-slate-50/50 rounded-3xl p-4">
        <div className="w-full bg-white shadow-lg rounded-3xl p-6 md:p-12 text-center">
          {/* ... Success UI Content (Keep your existing Success UI here) ... */}
          <h2 className="text-2xl font-black text-slate-900">
            You're all set!
          </h2>
          <p className="mt-3 text-slate-500 font-medium">
            Your booking is confirmed and added to your calendar.
          </p>

          {fnData.meetLink && (
            <div className="mt-10 group">
              <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 p-6 transition-all hover:border-blue-300 hover:bg-blue-50/30">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Meeting Connection
                </h3>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-2 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />

                    <span className="font-mono text-sm truncate max-w-[200px]">
                      {fnData.meetLink.replace("https://", "")}
                    </span>
                  </div>

                  <a
                    href={fnData.meetLink}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                  >
                    Join Google Meet
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Calendar Section */}
        <div className="w-full md:w-auto flex justify-center">
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
                className="rounded-md border border-black/20 shadow-md bg-white h-full w-full"
                classNames={{ day: "m-auto md:m-2" }}
                showOutsideDays={true}
                modifiersClassNames={{
                  available: "bg-blue-100 text-blue-700 font-bold rounded-lg",
                }}
              />
            )}
          />
        </div>

        {/* Time Slots Section */}
        {selectedDate && (
          <div className="w-full md:flex-1">
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <div className="bg-white rounded-md w-full p-5 border max-h-full md:h-93 border-black/20 shadow-sm">
                  <h3 className="mb-4 font-bold text-lg text-center">
                    Available Slots for {format(selectedDate, "MMM do")}
                  </h3>
                  {timeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={field.value === slot ? "default" : "outline"}
                          className="w-full"
                          onClick={() => field.onChange(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-slate-500 py-8">
                      No slots available
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        )}
      </div>

      {/* Form Section */}
      {selectedTime && (
        <div className="flex flex-col gap-4 bg-white shadow-md p-6 border border-black/20 rounded-md animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold border-b pb-2">
            Enter Your Details
          </h2>
          <div className="space-y-4">
            <div>
              <Input {...register("name")} placeholder="Enter your name" />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input {...register("email")} placeholder="Enter your email" />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Textarea
                {...register("additionalInfo")}
                placeholder="Any notes for the meeting?"
              />
            </div>
            <Button
              className="w-full"
              size="lg"
              disabled={loading}
              type="submit"
            >
              {loading
                ? "Booking your slot..."
                : `Schedule for ${selectedTime}`}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default BookingForm;
