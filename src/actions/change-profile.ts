"use server"

import { uploadCloudinary } from "@/lib/cloudinary";

export const changeProfilePic  = async(image:File) =>{
if(!image){
    return;
}
console.log(image, "THIS IS IMAGE")
// const result:any  = await uploadCloudinary(image, "algorithmic-oddysey")

// return result.secure_url;
}