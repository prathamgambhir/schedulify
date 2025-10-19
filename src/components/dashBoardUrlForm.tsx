"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/lib/zodSchemas";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/userAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

interface uniqueUrlProp {
  defaultUsername?: string;
}

const UniqueUrlForm: React.FC<uniqueUrlProp> = ({ defaultUsername }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  const [origin, setOrigin] = useState<string>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log(`inside window check ${window.location.origin}`);
      setOrigin(window.location.origin);
    }

    if (typeof defaultUsername !== "undefined") {
      // console.log(`inside defaultusernmae ${defaultUsername}`);
      setValue("username", defaultUsername);
    }
  }, [defaultUsername, setValue]);

  const {
    data,
    error,
    fn: fnUpdateUsername,
    loading,
  } = useFetch(updateUsername);

  const { update } = useSession();
  const router = useRouter();
  const submitForm = async (sendData: { username: string }) => {
    await fnUpdateUsername(sendData.username);
    if (data?.success) {
      await update({
        user: {
          username: sendData,
        },
      });
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <span className="text-sm font-bold opacity-70">{origin}/</span>
        <Input
          {...register("username")}
          placeholder="username"
          className="h-8"
        />
      </div>
      {errors.username && (
        <p className="text-sm fonr-bold text-red-600 opacity-80">
          {errors.username.message}
        </p>
      )}
      {error && (
        <p className="text-sm fonr-bold text-red-600 opacity-80">
          Unable to update username
        </p>
      )}
      <div className="flex items-center gap-4">
        <Button variant={"default"} type="submit">
          {loading ? (
            <>
              <Spinner /> Updating....
            </>
          ) : (
            <>Update Username</>
          )}
        </Button>
        <Button variant={"outline"}>Copy Link</Button>
      </div>
    </form>
  );
};

export default UniqueUrlForm;
