"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { availabilitySchema } from "@/lib/zodSchemas";
import {
  availabilityDataType,
  updateAvailability,
} from "@/actions/availabilityAction";
import { Checkbox } from "../ui/checkbox";
import { timeSlots, weekdays } from "@/app/(main)/availability/data";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import useFetch from "@/hooks/use-fetch";
import { Spinner } from "../ui/spinner";
import toast from "react-hot-toast";

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
    toast.success("Upadated Availability");
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-300 shadow p-4 md:p-6 lg:p-8">
      <form action="" onSubmit={handleSubmit(submitForm)} className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Weekdays Section - Mobile: Stacked cards, Desktop: Grid */}
        <div className="w-full lg:w-[60%] space-y-3 lg:space-y-0">
          {weekdays.map((day) => {
            const isAvailable = watch(`${day}.isAvailable`);
            return (
              <div
                key={day}
                className="p-3 md:p-4 border rounded-lg lg:border-0 lg:p-0 lg:grid lg:grid-cols-16 lg:pb-4 lg:text-md lg:font-medium lg:items-center bg-gray-50 lg:bg-transparent mb-2 lg:mb-0"
              >
                {/* Mobile/Tablet: Stacked layout */}
                <div className="lg:hidden flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Controller
                      name={`${day}.isAvailable`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          className="h-5 w-5"
                          id={`${day}.isAvailable`}
                          checked={field.value}
                          onCheckedChange={(checked: boolean) => {
                            setValue(`${day}.isAvailable`, checked);
                          }}
                        />
                      )}
                    />
                    <label
                      htmlFor={`${day}.isAvailable`}
                      className="font-medium text-sm md:text-base"
                    >
                      {`${day.charAt(0).toUpperCase()}${day.slice(1)}`}
                    </label>
                  </div>
                  {isAvailable && (
                    <div className="flex items-center gap-2 ml-1">
                      <span className="text-xs md:text-sm text-gray-600">From:</span>
                      <Controller
                        name={`${day}.startTime`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={!isAvailable}
                          >
                            <SelectTrigger className="w-full md:w-32 h-8">
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
                        )}
                      />
                      <span className="text-xs md:text-sm text-gray-600">To:</span>
                      <Controller
                        name={`${day}.endTime`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={!isAvailable}
                          >
                            <SelectTrigger className="w-full md:w-32 h-8">
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
                        )}
                      />
                    </div>
                  )}
                  {isAvailable && errors[day]?.endTime && (
                    <div className="text-red-500 text-xs ml-1 font-semibold">
                      {errors[day].endTime.message}
                    </div>
                  )}
                </div>

                {/* Desktop: Original grid layout */}
                <div className="hidden lg:flex lg:col-span-1 items-center">
                  <Controller
                    name={`${day}.isAvailable`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        className="h-6 w-6"
                        id={`${day}.isAvailable`}
                        checked={field.value}
                        onCheckedChange={(checked: boolean) => {
                          setValue(`${day}.isAvailable`, checked);
                        }}
                      />
                    )}
                  />
                </div>

                <div className="hidden lg:block lg:col-span-3">
                  <label htmlFor={`${day}.isAvailable`}>
                    {`${day.charAt(0).toUpperCase()}${day.slice(1)}`}
                  </label>
                </div>

                <div className="hidden lg:flex lg:col-span-4 lg:justify-center lg:items-center">
                  <Controller
                    name={`${day}.startTime`}
                    control={control}
                    render={({ field }) => (
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
                    )}
                  />
                </div>

                <div className="hidden lg:block lg:col-span-1 lg:text-center">
                  To
                </div>

                <div className="hidden lg:flex lg:col-span-4 lg:flex-col lg:justify-center lg:items-center">
                  <Controller
                    name={`${day}.endTime`}
                    control={control}
                    render={({ field }) => (
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
                    )}
                  />
                  {errors[day]?.endTime && (
                    <div className="text-red-500 text-xs/4 h-2 font-semibold text-center">
                      {errors[day].endTime.message}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop separator */}
        <div className="hidden lg:block">
          <Separator orientation="vertical" />
        </div>

        {/* Settings Section - Mobile: Bottom, Desktop: Right side */}
        <div className="w-full lg:w-auto lg:flex-1 flex flex-col justify-start lg:justify-center gap-4 lg:gap-6 px-1">
          <div className="flex flex-col md:flex-row lg:flex-col text-sm md:text-base font-semibold justify-center items-center gap-2 lg:gap-3">
            <span className="text-center lg:text-left">Minimum gap between bookings:</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-24 md:w-32 h-9"
                {...register("timeGap", { valueAsNumber: true })}
              />
              <span className="text-xs font-bold opacity-60 whitespace-nowrap">(minutes)</span>
            </div>
          </div>
          {errors.timeGap && (
            <div className="text-red-500 text-xs font-semibold text-center">
              {errors.timeGap.message}
            </div>
          )}
          <div className="flex justify-center items-center mt-2 lg:mt-10">
            <Button type="submit" disabled={loading} className="w-full md:w-auto px-8">
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
