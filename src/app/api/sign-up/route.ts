import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/utils/tokenGenerator";
import { hashPassword } from "@/utils/hashPassword";
export async function POST(req: NextRequest) {
  try {
    const { email, username, password } = await req.json();
    console.log(email, " email")
    const isEmailUnique = await prisma.user.findFirst({
      where:{
        email,
      }
    })
    // TODO : USER NAME MUST BE UNUQIE ALSO

    if(isEmailUnique){
      return NextResponse.json({error:"Email is already exist"}, {status:409})
    }
    const hashedPassword = await hashPassword(password)
       const defaultImage = 'https://res.cloudinary.com/dv6qpahip/image/upload/v1718451921/algorithmic-oddysey/cyftkayeh6c0hsuaihtc.png'
    const createUser = await prisma.user.create({
      data: {
        email,
        username,
        password:hashedPassword,
        emailVerificationToken: "123456", /// THIS IS TEMPORAR TOKEN
        // generateToken(),
        userImage:defaultImage
      },
    });

    if (createUser)
      return NextResponse.json(
        { message: "User created succesffully" },
        { status: 200 }
      );
    return ;
  } catch (error: any) {
    throw Error(error);
  }
}
