"use client";
import React, { useEffect, useState } from "react";
import { Avatar, cn } from "@nextui-org/react";
import { Navbar, NavbarContent, NavbarItem, } from "@nextui-org/react";
import Link from "next/link";
import { Menu,  } from "lucide-react";
import DarkModeButton from "./DarkModeButton";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import userInfo from "@/store/store";
import Notification from "../notification/Notification";
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);
  const { fetchUser, user } = userInfo();
  useEffect(() => {
    fetchUser();
  }, [session?.user.id, fetchUser, pathname]);
  /// TODO: WHEN OVERING THE USER AVATAR SHOW THE DROPDOWN OPTION FOR USER PROFILE , CREATE POST AND LOGOUT (PROLLY)
  return (
    <Navbar
      className={cn(
        " px-10 cursor-pointer w-full  bg-transparent bg-opacity-70 transition backdrop-filter backdrop-blur-sm absolute z-10 text-white font-bold border-b-1 border-[#cbd5e11a]",
        { "fixed bg-[#414d69] dark:bg-[#1b1b1f]  ": isScrolled }
      )}
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <Link href="/">
          <p className="font-bold text-xl mr-16">LOGO</p>
        </Link>
      </NavbarContent>
      <NavbarContent className="w-full hidden lg:flex gap-10" justify="center">
        <NavbarItem>
          <Link href="#" className="text-xl">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/forum" className="text-xl">
            Forum
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-xl">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" className="text-xl">
            Socials
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-xl">
            Download
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-xl">
            Docs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* FOR MOBILE  */}
        <NavbarItem className="md:hidden flex">
          <Menu />
        </NavbarItem>
        {user?.id ? (
          <>
            <NavbarItem className="relative">
          <Notification userId={user.id}/>
            </NavbarItem>
            <NavbarItem
              className="hidden lg:flex text-xl"
              onClick={() => router.push(`/user/${user?.username as string}`)}
            >
              <Avatar showFallback src={user.userImage as string} size="md" />
            </NavbarItem>
          </>
        ) : (
          <NavbarItem
            className="hidden lg:flex text-xl"
            onClick={() => signIn()}
          >
            Login
          </NavbarItem>
        )}
        <NavbarItem>
          <DarkModeButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
