
import { Resend } from 'resend';
import {render} from "@react-email/render"
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from '../../../../emails/EmailTemplate';
const resend = new Resend(process.env.RESEND_API_KEY);
export  async function POST (req: NextRequest) {
    const {email, userName} = await req.json()
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
   html:render(EmailTemplate({userFirstname:userName}))
    });
  
    if (error) {
      return NextResponse.json({error}, {status:400});
    }
  
    return NextResponse.json({message:data}, {status:200})
  };