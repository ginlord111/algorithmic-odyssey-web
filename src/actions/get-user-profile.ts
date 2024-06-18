"use server"
import prisma from "@/db"
import { authOptions } from "@/utils/authOptions"
import { User } from "@prisma/client"
import { getServerSession } from "next-auth"

export const fetchUserProfile = async() =>{
    const session = await getServerSession(authOptions)
    if(!session?.user.id) return;
    const user = await prisma.user.findUnique({
        where:{
            id: session?.user.id as string,
        },
    
     })
     return user as User

}