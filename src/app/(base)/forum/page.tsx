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
  return (
    <Query>
      <NextAuthProvider>
        <Forum />
      </NextAuthProvider>
    </Query>
  );
};

export default ForumPage;
