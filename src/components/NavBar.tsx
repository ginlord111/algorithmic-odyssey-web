"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@nextui-org/react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { Menu } from 'lucide-react';
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
  }, []);
  return (
    <Navbar
      className={cn(
        "bg-transparent bg-opacity-70 transition  backdrop-filter backdrop-blur-sm absolute z-50 text-white font-bold",
        { "fixed bg-orange-200": isScrolled }
      )}
      maxWidth="xl"
    >
      <NavbarContent>
        <p className="font-bold text-xl mr-16">LOGO</p>
        <div className="hidden sm:flex gap-10">
          <NavbarItem>
            <Link href="#" className="text-xl">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#" className="text-xl">
              Community
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
      <NavbarItem  className="md:hidden flex">
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
            as={Link}
            href="#"
            className="text-red-500 p-6 font-bold border-3 text-md border-black mr-4"
          >
            Download now
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
