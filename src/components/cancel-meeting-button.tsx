import React from "react";
import { Button } from "./ui/button";

type MeetingcancelButtonProps ={
    meetingId: string
}

const CancelMeetingButton: React.FC<MeetingcancelButtonProps> = async({meetingId}) => {
    
    return(
        <>
            <Button variant={"default"} size={"sm"}>Cancel Meet</Button>
        </>
    )
}

export default CancelMeetingButton;