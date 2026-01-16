"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/lib/zodSchemas";
import useFetch from "@/hooks/use-fetch";
import { updateUsername } from "@/actions/userAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import toast from "react-hot-toast";

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

  const { data:session, update } = useSession();
  const router = useRouter();
  const submitForm = async (sendData: { username: string }) => {
    const res = await fnUpdateUsername(sendData.username);
    // console.log(res?.success)
    if (res?.success) {
      try {
        await update({username: sendData.username});
        toast.success("Updated Username")
        // console.log("again called sessioonnn")
        router.refresh();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const[isCopied, setIsCopied] = useState<boolean>(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${defaultUsername}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      throw new Error("unable to copy url");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4 md:gap-8">
      <div className="flex gap-2 items-center flex-wrap">
        <span className="text-sm md:text-base font-bold opacity-70">{origin}/</span>
        <Input
          {...register("username")}
          placeholder="username"
          className="h-9 md:h-8 w-full md:w-48"
        />
      </div>
      {errors.username && (
        <p className="text-sm font-bold text-red-600 opacity-80">
          {errors.username.message}
        </p>
      )}
      {error && (
        <p className="text-sm font-bold text-red-600 opacity-80">
          Unable to update username
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Button variant={"default"} type="submit" className="w-full sm:w-auto">
          {loading ? (
            <>
              <Spinner /> Updating....
            </>
          ) : (
            <>Update Username</>
          )}
        </Button>
        <Button type="button" variant={"outline"} onClick={handleCopy} className="w-full sm:w-auto">{isCopied ? "Copied" : "Copy Link"}</Button>
      </div>
    </form>
  );
};

export default UniqueUrlForm;
