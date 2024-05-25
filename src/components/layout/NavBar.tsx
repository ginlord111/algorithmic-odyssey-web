"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@nextui-org/react";
import { Navbar, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import Link from "next/link";
import { Menu } from "lucide-react";
import DarkModeButton from "./DarkModeButton";
export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
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
  return (
    <Navbar
      className={cn(
        "bg-transparent bg-opacity-70 transition backdrop-filter backdrop-blur-sm absolute z-10 text-white font-bold border-b-1 border-[#cbd5e11a]",
        { "fixed bg-[#414d69] dark:bg-[#1b1b1f]  ": isScrolled }
      )}
      maxWidth="xl"
    >
      <NavbarContent>
        <Link href="/">
          <p className="font-bold text-xl mr-16">LOGO</p>
        </Link>

        <div className="hidden sm:flex gap-10">
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
        </div>
      </NavbarContent>
      <NavbarContent justify="end" className="flex gap-10">
        <NavbarItem className="md:hidden flex">
          <Menu />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-xl">
            Contribute
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-xl">
            Docs
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
          color="default"
          variant="faded"
            as={Link}
            href="#"
            className="text-red-500 p-6 font-bold border-3 text-md border-black mr-4"
          >
            Download now
          </Button>
        </NavbarItem>
        <NavbarItem>
    <DarkModeButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
