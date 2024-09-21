import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  import Image from "next/image";
  interface KoalaWelcomeEmailProps {
    username: string;
    otp:string
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const EmailTemplate = ({
    username,
    otp
  }: KoalaWelcomeEmailProps) => (
    <Html>
    <Head />
    <Preview>
      Verify your email to get started with Algorithmic Odyssey!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Image
          src="https://res.cloudinary.com/dv6qpahip/image/upload/v1726771065/algorithmic-logo_pqrque.png"
          width="170"
          height="50"
          alt="Algorithmic Odyssey"
          style={logo}
        />
        <Text style={paragraph}>Hi {username},</Text>
        <Text style={paragraph}>
          Welcome to Algorithmic Odyssey! To complete your sign-up, please verify your email by entering the code below on the verification page:
        </Text>
        <Section style={otpContainer}>
          <Text style={otpCode}>{otp}</Text>
        </Section>
        {/* <Text style={paragraph}>
          If you didn’t request this, you can safely ignore this email.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://algorithmic-odyssey.com/verify">
            Verify your email
          </Button>
        </Section> */}
        <Text style={paragraph}>
          Best,
          <br />
          The Algorithmic Odyssey Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
        DHVSU Bacolor Main Campus
        </Text>
      </Container>
    </Body>
  </Html>
  
  );
  
  EmailTemplate.PreviewProps = {
    username: "Alan",
  } as KoalaWelcomeEmailProps;
  
  export default EmailTemplate;
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    backgroundColor: "#333",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  const otpContainer = {
    backgroundColor: "#f0f0f0", 
    borderRadius: "5px",        
    padding: "15px",            
    margin: "20px 0"           
  };



  const otpCode = { fontSize: "24px", fontWeight: "bold", color: "#333" };