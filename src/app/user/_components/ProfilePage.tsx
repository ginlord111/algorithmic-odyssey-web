import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook, Github, Youtube,Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = ({
  email,
  username,
  userImage,
}:{
  email:string | null,
  username:string,
  userImage:string | null,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-row ">
 <div className="absolute w-[150px] h-[150px] top-[-50px]">
 {/* <Image 
      src={userImage as string}
      alt="User Profile Picturee"
      fill
      className="object-cover rounded-full border-3 border-white"
      priority
      loading="eager"
      /> */}
 </div>
 <div className=" relative w-full mt-2 mx-[200px]">
<div className="flex flex-col ">
<p className="text-4xl font-bold ">{username}</p> 
<p className="text-muted-foreground">{email}</p>  
<div className="flex flex-row gap-10 pt-5 cursor-pointer">

<div className="flex gap-1">
  <Facebook className="w-5 h-5"/>
  <span className="text-sm text-muted-foreground tracking-wide">@username</span>
</div>
<div className="flex gap-1">
  <Twitter className="w-5 h-5"/>
  <span className="text-sm text-muted-foreground tracking-wide">@username</span>
</div>
<div className="flex gap-1">
  <Github className="w-5 h-5"/>
  <span className="text-sm text-muted-foreground tracking-wide">@username</span>
</div>
<div className="flex gap-1">
  <Instagram className="w-5 h-5"/>
  <span className="text-sm text-muted-foreground tracking-wide">@username</span>
</div>
</div>
</div>
<div className="mt-10 flex flex-row">
<Link href="#">
<Button variant="link" className="font-bold">
Overview
</Button>
</Link>

<Link href="#">
<Button variant="link" className="font-bold">
Post
</Button>
</Link>

<Link href="#">
<Button variant="link" className="font-bold">
Game
</Button>
</Link>
</div>
 </div>
      </div>
    </div>
  );
};

export default ProfilePage;
