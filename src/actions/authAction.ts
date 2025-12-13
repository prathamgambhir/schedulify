"use server";

import { loginSchema, signupSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export const signup = async (formdata: FormData) => {
  const parsedData = signupSchema.safeParse({
    name: formdata.get("fullname"),
    email: formdata.get("email"),
    username: formdata.get("username"),
    password: formdata.get("password"),
  });

  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error("Invalid Input Data");
  }

  const { name, email, username, password } = parsedData.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    //ToDo : fix followup signin
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });

    // console.log(newUser)
  } catch (err) {
    console.log(err);
    throw new Error("Something went wriong");
  }
};

export const signin = async (formdata: FormData) => {
  const parsedData = loginSchema.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
  });

  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error("Invalid Input Data");
  }

  const { email, password } = parsedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard",
    });
    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("CredentialsSignin")) {
        throw new Error("User Not Exists or Invalid Credentials");
      }
    }
    throw error;
  }
};

export const signinWithGoogle = async () => {
  await signIn("google", { redirect: true, redirectTo: "/dashboard" });
  revalidatePath("/dashboard");
};

export const signout = async () => {
  await signOut({ redirectTo: "/login", redirect: true });
  revalidatePath("/login");
};
