"use server"
import prisma from "@/db"
import { authOptions } from "@/utils/authOptions"
import { Activity, Classroom, ClassroomAnnouncement, User } from "@prisma/client"
import { getServerSession } from "next-auth"
export const fetchUserProfile = async () => {
    try {
      const session = await getServerSession(authOptions);
  
      if (session && session.user && session.user.id) {
        const user = await prisma.user.findUnique({
          where: {
            id: session.user.id as string,
          },
        });
  
        return user as User;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  
    return null;
  };


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


export const getUserCode = async(email:string) => {
 const user =  await prisma.user.findFirst({
        where:{
        email,
        },
    })

    if(user) return user.emailVerificationToken;

    return null
}

export const verifyEmail = async (email:string) => {
    const verifyEmailUser = await prisma.user.update({
        where:{
            email
        },
        data:{
            emailVerificationToken:null,
            isEmailVerified:true,
        }
    })

    if(verifyEmailUser) return true;
    return false;
}

export const fetchClassAct = async(classId:string) => {
    const classAct = await prisma.activity.findMany({
        where:{
          classroomId:classId,
        }
        
      })

      return classAct  as Activity[] ?? []
}