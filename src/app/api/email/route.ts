
import { Resend } from 'resend';
import {render} from "@react-email/render"
import { NextRequest, NextResponse } from "next/server";
import {EmailTemplate} from '../../../../emails/EmailTemplate';
const resend = new Resend(process.env.RESEND_API_KEY);
export  async function POST (req: NextRequest) {
  try {
    const {email, username,token} = await req.json()
    console.log(EmailTemplate, "EMAIL TEMPLATE")
   const { data, error } = await resend.emails.send({
     from: 'algorithmic@algorithmic-odyssey.online',
     to: [`${email}`],
     subject: 'Email Verification',
  html:render(EmailTemplate({username:username, otp:token}))
   });
 
   if (error) {
     console.log(error, "ERROR")
     return NextResponse.json({error}, {status:400});
   }
 
   return NextResponse.json({message:data}, {status:200}) 
  } catch (error) {
    console.log(error, "ERROR")
    return NextResponse.json({message:"Error"}, {status:500}) 
  }
  };