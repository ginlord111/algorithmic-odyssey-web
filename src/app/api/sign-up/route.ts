import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/utils/tokenGenerator";
import { hashPassword } from "@/utils/hashPassword";
export async function POST(req: NextRequest) {
  try {
    const { email, username, password,role } = await req.json();
    console.log(email, " email")
    const isEmailOrUsernameUnique = await prisma.user.findFirst({
      where:{
      OR:[
        {
          email,
        },
        {
          username
        }
      ]
      }
    })
    // TODO : USER NAME MUST BE UNUQIE ALSO

    if(isEmailOrUsernameUnique?.email === email){
      return NextResponse.json({emailError:"Email is already exist"}, {status:409})
    }
    if(isEmailOrUsernameUnique?.username ===username ){
      return NextResponse.json({usernameError:"Username is already exist"}, {status:409})
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
        userImage:defaultImage,
        isStudent:role === "student" ?  true : role==="teacher" ? false : true
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
