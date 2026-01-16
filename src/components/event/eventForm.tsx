"use client";

import { eventSchema } from "@/lib/zodSchemas";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createEventAction } from "@/actions/eventAction";
import useFetch from "@/hooks/use-fetch";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type EventFormType = z.infer<typeof eventSchema>;

interface props {
  handleClose: () => void;
  initialData?: Partial<EventFormType>;
}

const EventForm: React.FC<props> = ({ handleClose, initialData = {} }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: (initialData.title as string) ?? "",
      description: (initialData.description as string) ?? "",
      duration: (initialData.duration as number) ?? 30,
      isPrivate: initialData.isPrivate ?? true,
    },
  });

  const { loading, fn: fnCreateEvent, error } = useFetch(createEventAction);
  const router = useRouter();
  const submitForm = async (data: EventFormType) => {
    // console.log("inside submit handlee");

    await fnCreateEvent(data);
    toast.success("Event created successfully");
    if (!loading && !error) handleClose();
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      //as event can propgate (i.e bubble up) to the dialogso and making the form submit to be never called so we use stopPropogation()
      onClick={(e) => e.stopPropagation()}
      className="px-4 md:px-5 flex flex-col gap-4 md:gap-5 mt-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Event Title
        </label>
        <Input id="title" {...register("title")} className="mt-1 h-10" />
        {errors.title && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Event Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          className="mt-1 max-h-[150px] md:max-h-[200px] overflow-y-auto"
        />
        {errors.description && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Duration( minutes )
        </label>
        <Input
          id="duration"
          {...register("duration", { valueAsNumber: true })}
          className="mt-1 h-10"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.duration.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="isPrivate"
          className="block text-sm font-medium text-gray-700"
        >
          Event Privacy
        </label>

        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value: string) =>
                field.onChange(value === "true")
              }
            >
              <SelectTrigger className="mt-2 h-10">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        ></Controller>
        {errors.isPrivate && (
          <p className="text-red-500 text-sm font-medium mt-1">
            {errors.isPrivate.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full md:w-auto">
        {loading ? (
          <>
            <Spinner /> Scheduling your event...
          </>
        ) : (
          <>Create Event</>
        )}
      </Button>
    </form>
  );
};

export default EventForm;
