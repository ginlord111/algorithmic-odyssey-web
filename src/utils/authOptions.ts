import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/db";
export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
  secret:process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
providers:[
    GitHubProvider({
        clientId:process.env.GITHUB_CLIENT_ID as string,
        clientSecret:process.env.GITHUB_CLIENT_SECRET as string,
    }),
    
],
callbacks: {
    session: ({ session, token }) => ({
        ...session,
        user: {
            ...session.user,
            id: token.sub,
        },
    }),
},
}