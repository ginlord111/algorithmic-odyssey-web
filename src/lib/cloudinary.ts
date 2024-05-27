
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    secure: true,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  });


export async function uploadCloudinary(image:File, folder:string){
    if(!image){
        return // END THIS FUNCTION IF THE CAPTION IS TEXT
    }
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer)
  return  new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
        resource_type:"auto",
        folder:folder,
    }, async (error, result) =>{
      if (error) {
         reject(error);
        return;
      }
    return resolve(result);
    })
    .end(buffer);
  });
}
