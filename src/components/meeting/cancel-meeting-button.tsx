"use client";

import React from "react";
import { Button } from "../ui/button";
import useFetch from "@/hooks/use-fetch";
import { cancelMeeting } from "@/actions/meetingsAction";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type MeetingcancelButtonProps = {
  meetingId: string;
};

const CancelMeetingButton: React.FC<MeetingcancelButtonProps> =({
  meetingId,
}) => {
  const router = useRouter();
  const { fn: fnCancelMeeting, error, data, loading } = useFetch(cancelMeeting);
  const onSubmit = async () => {
    if (window.confirm("Are you sure you want to cancel this meeting")) {
      await fnCancelMeeting(meetingId);
      toast.success("Meeting Canceled")
      router.refresh();
    }
  };

  return (
    <>
      <Button
        variant={"default"}
        disabled={loading}
        size={"sm"}
        onClick={onSubmit}
      >
        {loading ? (
          <p>
            <Spinner />
            Canceling Meet
          </p>
        ) : (
          <p>Cancel Meet</p>
        )}
      </Button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
  );
};

export default CancelMeetingButton;
