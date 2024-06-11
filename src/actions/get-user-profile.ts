"use server"
import prisma from "@/db"
import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const fetchUserProfile = async() =>{
try {
    const session = await getServerSession(authOptions)
    if(!session?.user.id){
        return;
    }
    const user = await prisma.user.findUnique({
        where:{
            id: session?.user.id as string,
        },
        select:{
            username:true,
        }
     })
    if(user && user.username){
        return user.username
    }
    return null;
} catch (error) {
    console.log(error)
}
}