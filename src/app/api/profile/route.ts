import prisma from "@/db";
import { uploadCloudinary } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){   
 try {
    const formData = await req.formData()
  const userProfile = formData.get("profile") as unknown as File
  const userId = formData.get("userId") as string
    const profileImage:any =  await uploadCloudinary(userProfile, "algorithmic-oddysey");
    
    await prisma.user.update({
        where:{
            id:userId
        },
        data:{
            userImage:profileImage.secure_url
        }
    })
/// todo : add a condition to determin if the user profile is in default and if so go return the userImagee
    return NextResponse.json({profile:profileImage.secure_url}, {status:200})
 } catch (error) {
    console.log(error)
 }
}