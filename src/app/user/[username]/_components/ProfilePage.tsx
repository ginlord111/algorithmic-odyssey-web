"use client";
import { Button as ButtonShadCn } from "@/components/ui/button";
import { User } from "@prisma/client";
import {
  Instagram,
  Twitter,
  Facebook,
  Github,
  Settings,
  Camera,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {  useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import AccountDetails from "./AccountDetails";
import { Button } from "@nextui-org/react";
const ProfilePage = ({ username,id,email,userImage }: User ) => {
  const [userProfile, setUserProfile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session } = useSession();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleSignOut = () => {
    return signOut();
  };


  useEffect(()=>{
    const changeProfile = async () => {
      if (!userProfile) {
        return;
      }
      setIsLoading((prev) => prev= true)
      const formData = new FormData();
      formData.append("profile", userProfile);
      formData.append("userId", session?.user.id as string);
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setUserProfile(null);
      setIsLoading((prev)=>prev=false)
      router.refresh();
      return result.profile;
    };
    changeProfile()
  },[userProfile,session?.user.id])
 
  return (
    <div className="relative">
      <div className="flex lg:flex-row flex-col lg:items-start items-center">
        <div className="absolute w-[150px] h-[150px] top-[-50px]">
          <Image
            src={userImage as string}
            alt="User Profile Picturee"
            className="object-cover rounded-full border-3 border-white"
            priority
            fill
            loading="eager"
          />
          {isLoading  && (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm rounded-full"></div>
                <Loader2 className="w-24 h-24 animate-spin z-10 text-white" />
              </div>
            )}
          {session?.user.id === id && (
            <div className="absolute top-[110px] left-[110px] w-fit">
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={(e) => {
                  if (!e.target.files) {
                    return;
                  }
                  const file = e.target.files[0];
                  return setUserProfile(file);
                }}
              />
              <Button
                isIconOnly
                className="rounded-full"
                onClick={() => fileRef.current?.click()}
              >
                <Camera className="w-fit" />
              </Button>
            </div>
          )}
        </div>

        <div className=" relative w-full lg:mt-2 mx-[200px] mt-[120px]">
          <div className="flex flex-col ">
            <p className="lg:text-4xl text-xl font-bold lg:text-start text-center ">
              {username}
            </p>
            <p className="text-muted-foreground lg:text-start text-center">
              {email}
            </p>
            <div className="flex lg:flex-row flex-col gap-10 pt-5 cursor-pointer lg:items-start items-center">
              <div className="flex gap-1">
                <Facebook className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  @username
                </span>
              </div>
              <div className="flex gap-1">
                <Twitter className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  @username
                </span>
              </div>
              <div className="flex gap-1">
                <Github className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  @username
                </span>
              </div>
              <div className="flex gap-1">
                <Instagram className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  @username
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-row lg:justify-start justify-center">
            <Link href="#">
              <ButtonShadCn variant="link" className="font-bold">
                Account Details
              </ButtonShadCn>
            </Link>

            <Link href="#">
              <ButtonShadCn variant="link" className="font-bold">
                Post
              </ButtonShadCn>
            </Link>

            <Link href="#">
              <ButtonShadCn variant="link" className="font-bold">
                Game
              </ButtonShadCn>
            </Link>
          </div>
        </div>
        {session?.user.email === email && (
          <DropdownMenu>
            <DropdownMenuTrigger className="h-fit mt-10" asChild>
              <ButtonShadCn variant="ghost" className="border-transparent">
                <Settings />
              </ButtonShadCn>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
{session?.user.id === id && (
  
  <AccountDetails />
)}
    </div>
  );
};

export default ProfilePage;
