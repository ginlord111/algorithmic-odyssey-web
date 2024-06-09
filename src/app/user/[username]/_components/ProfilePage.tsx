"use client"
import { Button as ButtonShadCn } from "@/components/ui/button";
import {
  Instagram,
  Twitter,
  Facebook,
  Github,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

const ProfilePage = ({
  email,
  username,
}: {
  email: string | null;
  username: string;
  userImage: string | null;
}) => {
  const {data:session} = useSession()
const router = useRouter()
  const handleSignOut = () => {
    router.push("/")
    signOut();
  }
  return (
    <div className="relative">
      <div className="flex flex-row ">
        <div className="absolute w-[150px] h-[150px] top-[-50px]">
          <Image
            src="https://res.cloudinary.com/dv6qpahip/image/upload/v1717251171/algorithmic-oddysey/bt8yiy4rt2agbgtwfqv4.jpg"
            alt="User Profile Picturee"
            className="object-cover rounded-full border-3 border-white"
            priority
            loading="eager"
          />
        </div>
        <div className=" relative w-full mt-2 mx-[200px]">
          <div className="flex flex-col ">
            <p className="text-4xl font-bold ">{username}</p>
            <p className="text-muted-foreground">{email}</p>
            <div className="flex flex-row gap-10 pt-5 cursor-pointer">
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
          <div className="mt-10 flex flex-row">
            <Link href="#">
              <ButtonShadCn variant="link" className="font-bold">
                Overview
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
        <DropdownMenu  >
        <DropdownMenuTrigger  className="h-fit mt-10" asChild>
      <ButtonShadCn variant="ghost" className="border-transparent">
        <Settings />
      </ButtonShadCn>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
)}
      </div>
    </div>
  );
};

export default ProfilePage;
