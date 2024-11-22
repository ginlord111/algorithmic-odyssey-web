"use server"
import prisma from "@/db"
import { UserRole } from "@/types/types"
import { authOptions } from "@/utils/authOptions"
import { Activity, StudentActivity, User } from "@prisma/client"
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


export const submitRole = async(username:string,role:UserRole) =>{
  try {
  await prisma.user.update({
        where:{
            username
        },
        data:{
        isStudent:role === "student" ?  true : role==="teacher" ? false : true
        }
    })
    
    return {
        status:200
    }
  } catch (error) {
    console.log(error)
    return {
        status:500,
        message:"Something went wrong"
    }
  }
}

export const fetchTaskProgress = async(activityId:string, studentId:string) =>{
  try {
    const task = await prisma.studentActivity.findFirst({
        where:{
            activityId,
            studentId
        },
     select:{
        isCompleted:true,
        score:true,
     }
    })  

    if(!task) return null
    return task
  } catch (error) {
    console.log(error)
  }
}


export const fetchStudentCode = async(activityId:string, studentId:string)=>{
 try {
  const data = await prisma.studentActivity.findFirstOrThrow({
    where:{
      activityId,
      studentId
    },
    select:{
      codeSubmitted:true,
      codeLang:true
    }
  })
  if(data && data.codeLang && data.codeSubmitted){
    return {codeLang:data.codeLang, codeSubmitted:data.codeSubmitted}
  }

 } catch (error) {
  console.log(error)
 }
}

export const shouldRenderSubmitButton = async (activityId:string,studentId:string):Promise<StudentActivity | null> =>{
 const studAct = await prisma.studentActivity.findFirst({
  where:{
    activityId,
    studentId 
  }
})
if(!studAct)return null ;

return studAct
}

export const fetchTeacherFeedback = async(studActId:string) =>{
try {
  const data = await prisma.teacherFeedBack.findFirst({
    where:{
  studActId,
    }
  })
  if(!data) return null;
  
  return data 
} catch (error) {
  console.log(error)
}

}