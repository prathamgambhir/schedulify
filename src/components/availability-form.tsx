"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { availabilitySchema } from "@/lib/zodSchemas";
import {
  availabilityDataType,
  updateAvailability,
} from "@/actions/availabilityAction";
import { Checkbox } from "./ui/checkbox";
import { timeSlots, weekdays } from "@/app/(main)/availability/data";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import useFetch from "@/hooks/use-fetch";
import { Spinner } from "./ui/spinner";

interface availabilityFormType {
  initialData: availabilityDataType;
}

const AvailabilityForm: React.FC<availabilityFormType> = ({ initialData }) => {
  const {
    control,
    formState: { errors },
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const { loading, fn: fnUpdateAvailability } = useFetch(updateAvailability);
  const submitForm = async (data: any) => {
    // console.log(data);
    await fnUpdateAvailability(data);
  };

  return (
    <div className="w-full bg-white rounded-2xl h-108 border border-gray-300 shadow p-8">
      <form action="" onSubmit={handleSubmit(submitForm)} className="flex">
        <div className="w-[60%]">
          {weekdays.map((day) => {
            const isAvailable = watch(`${day}.isAvailable`);
            return (
              <div
                key={day}
                className="grid grid-cols-16 pb-4 text-md font-medium items-center"
              >
                <Controller
                  name={`${day}.isAvailable`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Checkbox
                        className="col-span-1 h-6 w-6"
                        id={`${day}.isAvailable`}
                        checked={field.value}
                        onCheckedChange={(checked: boolean) => {
                          setValue(`${day}.isAvailable`, checked);
                        }}
                      />
                      <Separator orientation="vertical" />
                    </>
                  )}
                />

                <label htmlFor={`${day}.isAvailable`} className="col-span-3">
                  {`${day.charAt(0).toUpperCase()}${day.slice(1)}`}
                </label>

                <Separator orientation="vertical" />

                <Controller
                  name={`${day}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <div className="col-span-4 flex justify-center items-center">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!isAvailable}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="StartTime" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <span className="col-span-1 text-center">To</span>

                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <div className="col-span-4 flex flex-col justify-center items-center">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!isAvailable}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="EndTime" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors[day]?.endTime && (
                        <div className="text-red-500 text-xs/4 h-2 font-semibold text-center">
                          {errors[day].endTime.message}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            );
          })}
        </div>
        <div className="mr-4">
          <Separator orientation="vertical" />
        </div>
        <div>
          <div className="flex text-md font-semibold justify-center items-center gap-2">
            <span>Minimum gap between bookings :</span>
            <Input
              type="number"
              className="w-32"
              {...register("timeGap", { valueAsNumber: true })}
            />
            <span className="text-xs font-bold opacity-60">(minutes)</span>
          </div>
          {errors.timeGap && (
            <div className="text-red-500 text-xs font-semibold text-center mt-4">
              {errors.timeGap.message}
            </div>
          )}
          <div className="flex justify-center items-center p-4 mt-10">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner /> Updating...
                </>
              ) : (
                "Update Availability"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AvailabilityForm;
