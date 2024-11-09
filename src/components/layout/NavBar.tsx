"use client";
import React, { useEffect, useState } from "react";
import { Avatar, cn } from "@nextui-org/react";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { Menu } from "lucide-react";
import DarkModeButton from "./DarkModeButton";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import userInfo from "@/store/store";
import Notification from "../notification/Notification";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import SearchComponent from "../search/SearchComponent";
import SearchMobileView from "@/app/search/_components/SearchMobileView";
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user, session, "USER AND SESSION");
        const response = await fetch("http://localhost:5120/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, session }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error occurred during fetch:", error || error);
      }
    };

    fetchData();
  }, [session, user, fetchUser]);
  /// TODO: WHEN OVERING THE USER AVATAR SHOW THE DROPDOWN OPTION FOR USER PROFILE , CREATE POST AND
  const navItems = [
    {
      name: "Tutorial",
      href: "/tutorial",
      className: "",
    },
    {
      name: "Game",
      href: "https://algody.vercel.app",
      className: "",
    },
    {
      name: "Classroom",
      href: "/classroom",
      className: "",
    },
    {
      name: "Forum",
      href: "/forum",
      className: "",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      className: "",
    },
    // {
    //   name: "About us",
    //   href: "/about-us",
    //   className: "",
    // },
  ];
  const isSearchPage = pathname.includes("search")
  return (
    <Navbar
      className={cn(
        " px-10 cursor-pointer w-full  bg-transparent bg-opacity-70 transition backdrop-filter backdrop-blur-sm absolute z-10 text-white font-bold border-b-1 border-[#cbd5e11a]",
        { "fixed bg-[#00171F] dark:bg-[#1b1b1f]  ": isScrolled }
      )}
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <Link href="/">
          <div className="relative w-[50px] h-[40px]">
            <Image
              src="/algorithmic-logo.png"
              alt="LOGO"
              className="object-cover rounded-lg"
              layout="fill"
            />
          </div>
        </Link>
      </NavbarContent>
      <NavbarContent>
       {isSearchPage  ? null :  <SearchComponent />}
      </NavbarContent>
      <NavbarContent className={`w-full hidden lg:flex gap-10 `} justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.href}
              className="text-xl"
              target={item.name === "Game" ? "_blank" : ""}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {/* FOR MOBILE  */}
        <NavbarItem className="md:hidden flex w-[40%]">
          <Drawer direction="right" snapPoints={[0.7, 1]} handleOnly>
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent className="w-[70%] overflow-hidden bg-white  text-gray-500 h-full">
              <DrawerHeader className="p-4 border-b border-gray-700">
                <DrawerTitle className="text-lg font-semibold">
                  Navigation
                </DrawerTitle>
              </DrawerHeader>
              {navItems.map((item, index) => (
                <NavbarItem key={index} className="block py-2 px-3">
                  <Link href={item.href} className="text-xl">
                    <DrawerClose>{item.name}</DrawerClose>
                  </Link>
                </NavbarItem>
              ))}
            </DrawerContent>
          </Drawer>
        </NavbarItem>
        {session?.user.id ? (
          <>
            <NavbarItem className="relative">
              <Notification userId={user?.id as string} />
            </NavbarItem>
            <NavbarItem
              className="hidden lg:flex text-xl"
              onClick={() => router.push(`/user/${user?.username as string}`)}
            >
              <Avatar showFallback src={user?.userImage as string} size="md" />
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
