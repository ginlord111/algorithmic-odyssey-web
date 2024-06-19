import SidebarForum from "@/components/forum/SidebarForum";
import Header from "@/components/layout/Header";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import prisma from "@/db";
import { Fragment } from "react";
import ProfilePage from "./_components/ProfilePage";
import { User } from "@prisma/client";
export default async function RootLayout({children,params}: Readonly<{children: React.ReactNode, params:{username:string}}>) {
  const {username} = params
  const user = await prisma.user.findUnique({
    where:{
      username:decodeURIComponent(username)
    },
  })
  if(!user)return;
  return (
    <Fragment>
      <Header/>
      <MaxWidthWrapper >
      <ProfilePage {...user as User}/>
          {children}
      </MaxWidthWrapper>
    </Fragment>
  );
}
