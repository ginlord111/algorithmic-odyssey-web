import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { randomUsername } from "./randUsername";
import prisma from "@/db";
const username = randomUsername()
export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
  secret:process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
        maxAge:900, // 900 SECOND OR 15 MNS THE EXPIRATION OF THE SESSION 
    },
providers:[
    GitHubProvider({
        clientId:process.env.GITHUB_CLIENT_ID as string,
        clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
       profile(profile){
      const defaultImage = 'https://res.cloudinary.com/dv6qpahip/image/upload/v1718451921/algorithmic-oddysey/cyftkayeh6c0hsuaihtc.png'
        return {
            id: profile.id.toString(),
            username:username, /// GENERATE RANDOM USERNAME
            email:profile.email,
            userImage:defaultImage // DEFAULT IMAGE
            

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
   // TODO : DIRECT THE NEW USER TO THE USERNAME CONFIGURE TO CHANGE THEIR USERNAME
    newUser:`/user/${username}/`,
    signOut:'/auth/signout',
    // TODO: RETURN HOME WHEN THHE USER LOG OUT
}
}