import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { randomUsername } from "./randUsername";
import prisma from "@/db";
import { PrismaClient } from "@prisma/client";
export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
  secret:process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
    },
providers:[
    GitHubProvider({
        clientId:process.env.GITHUB_CLIENT_ID as string,
        clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
       profile(profile){
        console.log(profile, "PROFILE")
        return {
            id: profile.id.toString(),
            username:randomUsername(), /// GENERATE RANDOM USERNAME
            email:profile.email,
            userImage:'https://images.unsplash.com/broken' // DEFAULT IMAGE
            

        }
       }
    }),
    
],
callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user, 
          id: token.sub, 

        },
      };
    },
  },
pages:{
    newUser:"/" // TODO : DIRECT THE NEW USER TO THE USERNAME CONFIGURE TO CHANGE THEIR USERNAME
}
}