import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { randomUsername } from "./randUsername";
import prisma from "@/db";
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyPassword } from "./verifyHashPass";
import { defaultGameState } from "./defaultGamestate";
const username = randomUsername()
let email;
export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
  secret:process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
        maxAge:900, // 900 SECOND OR 15 MNS THE EXPIRATION OF THE SESSION 
    },
    
providers:[
  CredentialsProvider({
    name: 'Credentials',
    id:'credentials',
    credentials: {
      email: { label: "email", type: "email", placeholder: "Enter email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials: any) {
      
        const user = await prisma.user.findFirst({
          where:{
           email:credentials.email,
          }
      })
      if (!user) {
        throw new Error("Invalid Credentials");
      }
  
      const isValid =   await verifyPassword(credentials.password, user.password as string);
    
      if (!isValid) {
        throw new Error("Invalid Credentials");
      }

   
      return user;
      
    },
  }),
    GitHubProvider({
        clientId:process.env.GITHUB_CLIENT_ID as string,
        clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
        profile(profile) {
      const defaultImage = 'https://res.cloudinary.com/dv6qpahip/image/upload/v1718451921/algorithmic-oddysey/cyftkayeh6c0hsuaihtc.png'
          console.log(profile.email, "USER ID")
      return {
            id: profile.id.toString(),
            username:username, /// GENERATE RANDOM USERNAME
            email:profile.email,
            userImage:defaultImage, // DEFAULT IMAGE
            isEmailVerified:true,
            role:profile.role ?? "user",
            isStudent:profile.isStudent ?? true,
            gameState:defaultGameState
        }
       },
      
    }),
GoogleProvider({
  clientId:process.env.GOOGLE_CLIENT_ID as string,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
  profile(profile) {
    /// TODO : DEFAULT IMAGE SHOULD BE THE IMAGE OF THE USER IN GOOGLE AS WELL IN GITHUB
    const defaultImage = 'https://res.cloudinary.com/dv6qpahip/image/upload/v1718451921/algorithmic-oddysey/cyftkayeh6c0hsuaihtc.png'
    return {
          id: profile.sub,
          username:username, /// GENERATE RANDOM USERNAME
          email:profile.email,
          userImage:defaultImage, // DEFAULT IMAGE
          isEmailVerified:true,
          role:profile.role ?? "user",
          isStudent:profile.isStudent ?? true,
          gameState:defaultGameState,
      }
}})

],

// cookies: {
//   sessionToken: {
//     name: `next-auth.session-token`,
//     options: {
//      httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//       sameSite: 'lax', // 'lax' or 'none' (if using 'none', make sure your site is served over HTTPS)
//       path: '/',
//     },
//   },
// },
callbacks: {
  jwt({user, token, account}){
    if(user){
      token.role = user.role
      token.isStudent = user.isStudent
    }
    return token;
  },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user, 
          id: token.sub, 
          role:token.role,
          isStudent:token.isStudent,
        },
      };
    },
  },
pages:{
   // TODO : DIRECT THE NEW USER TO THE USERNAME CONFIGURE TO CHANGE THEIR USERNAME
    newUser:`/role?to=${username}`,
    signOut:'/auth/signout',
    // TODO: RETURN HOME WHEN THHE USER LOG OUT
signIn:'/auth',

}
}
