import React from "react";
import Forum from "./_components/Forum";
import Query from "@/components/tanstack-query/Query";
import NextAuthProvider from "@/components/provider/NextAuthProvider";
import SidebarForum from "@/components/forum/SidebarForum";
import Header from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/db";
const ForumPage = async() => {
  const session = await getServerSession(authOptions)
  let userLikes:string[] = []
  // IF THERE IS USER FETCH THE USER LIKES
  if(session?.user.id){
    const data = await prisma.forumLike.findMany({
      where:{
        userId:session.user.id
      },
      select:{
        forumId:true,
      }

  })
  userLikes = data.map((id)=>id.forumId); /// IT DOES NOT CONSTANTLY UPDATING SHOULD BE FIX
}
  return (
    <Query>
      <NextAuthProvider>
        <Forum userLikes={userLikes}/>
      </NextAuthProvider>
    </Query>
  );
};

export default ForumPage;
