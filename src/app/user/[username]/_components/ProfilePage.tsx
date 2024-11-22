"use client";
import { Button as ButtonShadCn } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Settings, Camera, Loader2, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import FollowBtn from "./FollowBtn";
import FollowingsList from "./FollowingsList";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
const ProfilePage = ({
  username,
  id,
  email,
  userImage,
  followerImages,
  followingImages,
  fullName,
}: User & {
  followerImages: { userFollowerImage: string }[];
  followingImages: { userFollowingImage: string }[];
}) => {
  const [userProfile, setUserProfile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>(username);
  const [isLoadingUsername, setIsLoadingUsername] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
    toast.success("Log out succesfully");
  };
  useEffect(() => {
    const changeProfile = async () => {
      if (!userProfile) {
        return;
      }
      setIsLoading((prev) => (prev = true));
      const formData = new FormData();
      formData.append("profile", userProfile);
      formData.append("userId", session?.user.id as string);
      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setUserProfile(null);
      setIsLoading((prev) => (prev = false));
      router.refresh();
      return result.profile;
    };
    changeProfile();
  }, [userProfile, session?.user.id]);

  useEffect(() => {
    if (session?.user.id === id) {
      router.push(`/user/${username}`);
    } else {
      router.push(`/user/${username}/posts`);
    }
  }, []);
const onSaveUsername = async (username:string) => {  
  setIsLoadingUsername(true); 
  const response = await fetch("/api/profile/edit/", {
    method: "POST",
    body: JSON.stringify({ userId:id,username:username }),
  });
  setIsLoadingUsername(false);
  if (response.ok && response.status === 200) {
    router.refresh();
    router.push(`/user/${username}`);
    toast.success("Edit profile successfully");
  }
}
  const handleBlur = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // setUsername(tempUsername)
      setIsEditing(false);
      console.log(tempUsername, "USERNAMEEE")
      // onSaveUsername(tempUsername)
    } else if (e.key === "Escape") {
      setTempUsername(username);
      setIsEditing(false);
    }
  };

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
          {isLoading && (
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
          <div className="flex flex-col">
            {isEditing ? (
           <div className="flex items-center space-x-4">
               <Input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-xl font-bold h-9 w-[200px]"
              />
              <ButtonShadCn className="bg-blue-500 w-14 text-xs md:text-base md:w-fit" onClick={()=>onSaveUsername(tempUsername)}>{isLoadingUsername ? <Loader2 className="animate-spin h-4 w-4"/> : "Save"}</ButtonShadCn>
              <ButtonShadCn className="bg-red-500 w-14 text-xs md:text-base md:w-fit" onClick={handleBlur}>Cancel</ButtonShadCn>
           </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="group flex items-center gap-2 text-xl font-bold cursor-text hover:cursor-pointer"
              >
                <span>{username}</span>
                <Pencil className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
            <div className="flex space-x-2">
              <p className="text-muted-foreground lg:text-start text-center">
                {fullName}
              </p>
              {/* <Tooltip content="Email is not verified" color="danger" 
           delay={0}
           closeDelay={0}
           motionProps={{
             variants: {
               exit: {
                 opacity: 0,
                 transition: {
                   duration: 0.1,
                   ease: "easeIn",
                 }
               },
               enter: {
                 opacity: 1,
                 transition: {
                   duration: 0.15,
                   ease: "easeOut",
                 }
               },
             },
           }}
          >
          <CircleAlert  className="bg-gray-500 w-fit rounded-full text-white"/>
          </Tooltip> */}
            </div>
            <FollowingsList
              followerImages={followerImages}
              followingImages={followingImages}
            />
            {/* <div className="flex lg:flex-row flex-col gap-10 pt-10 cursor-pointer lg:items-start items-center ">
              <div className="flex gap-1">
                <Facebook className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  {`${facebook ? `@${facebook}` : "@username"}`}
                </span>
              </div>
              <div className="flex gap-1">
                <Twitter className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  {`${twitter ? `@${twitter}` : "@username"}`}
                </span>
              </div>
              <div className="flex gap-1">
                <Github className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  {`${github ? `@${github}` : "@username"}`}
                </span>
              </div>
              <div className="flex gap-1">
                <Instagram className="w-5 h-5" />
                <span className="text-sm text-muted-foreground tracking-wide">
                  {`${instagram ? `@${instagram}` : "@username"}`}
                </span>
              </div>
            </div> */}
          </div>
          <div className="mt-10 flex flex-row lg:justify-start justify-center">
            {/* {session?.user.id === id && (
              <Link href={`/user/${username}`}>
                <ButtonShadCn
                  variant="link"
                  className={`font-bold ${
                   currentTab !== "posts" && "underline"
                  }`}
                >
                  Account Details
                </ButtonShadCn>
              </Link>
            )} */}
            <Link href={`/user/${username}/posts/`}>
              <ButtonShadCn variant="link" className={`font-bold underline`}>
                Posts
              </ButtonShadCn>
            </Link>

            {/* <Link href="#">
              <ButtonShadCn variant="link" className="font-bold">
                Game
              </ButtonShadCn>
            </Link> */}
          </div>
        </div>
        {session?.user.email === email ? (
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
        ) : (
          <FollowBtn className="pt-3" followingId={id} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
