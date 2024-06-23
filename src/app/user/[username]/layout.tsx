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
    include:{
      follower:{
        select:{
          userFollowerImage:true
        }
      },
      following:{
        select:{
            userFollowingImage:true,
        }
      }
    }
  })

  if(!user)return;
  const {follower, following} = user
  return (
    <Fragment>
      <Header/>
      <MaxWidthWrapper >
      <ProfilePage {...user as User} followerImages={follower} followingImages={following}/>
          {children}
      </MaxWidthWrapper>
    </Fragment>
  );
}
