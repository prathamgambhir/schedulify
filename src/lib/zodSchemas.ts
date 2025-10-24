import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.email(),
  username: z.string().min(3).max(50),
  password: z.string().min(3).max(100),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(100),
});

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Exceeded character limit"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(500, "Exceeded character limit"),
  duration: z.number().int().positive("Duration must be a positive number"),
  isPrivate: z.boolean(),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers & underscores"
    ),
});

export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable && data.startTime && data.endTime) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "End time must be more than start time",
      path: ["endTime"],
    }
  );

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "Time gap must positive").int(),
});
