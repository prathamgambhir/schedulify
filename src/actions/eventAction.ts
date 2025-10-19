"use server"

import { auth } from "@/auth"
import { EventFormType } from "@/components/eventForm";
import prisma from "@/lib/prisma";
import { eventSchema } from "@/lib/zodSchemas";

export const createEventAction = async (formdata: EventFormType) => {
    const validateData = eventSchema.parse(formdata)
    
    const session = await auth()
    const userId = session?.user.id;

    if(!session || !userId){
        throw new Error("User not authenticated")
    }


    const existingUser = await prisma.user.findUnique({
        where: {id: userId}
    })

    if(!existingUser){
        throw new Error("User not found")
    }

    const event = await prisma.event.create({
        data: {
            ...validateData,
            userId: userId
        }
    })

    console.log(event);
    return event;
}

export const getUserEvents = () => {}