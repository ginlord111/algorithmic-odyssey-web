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


export const fetchUserFollowing = async(userId:string) => {
    const session = await getServerSession(authOptions)
    console.log(userId, "USER ID")
    const isUserFollowed = await prisma.user.findFirst({
        where:{
            id:session?.user.id
        },
        include:{
           following:{
        where:{
            followingId:userId
        }
           }
         
        
        }
    })  

    if(!isUserFollowed) return null
    if(isUserFollowed.following.length > 0){
        return true
    }
    return false
}


export const fetchUserNotification = async(userId:string) => {
const notification = await prisma.notifications.findMany({
    where:{
        userId,
    },
    orderBy:{
        createdAt:"desc"
    }
})
if(!notification) return;
return notification;
}


export const readNotification = async(id:string) =>{
    await prisma.notifications.update({
        where:{
            id,
        },
        data:{
            isRead:true
        },
    })
}