import React from "react";
import { Instagram, Twitter, Facebook, Github, Youtube,Mail } from "lucide-react";
import {Button, Input} from "@nextui-org/react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
const Footer = () => {
  const socials = [
    {
      icon: Instagram,
      onClick: () => {},
    },
    {
      icon: Twitter,
      onClick: () => {},
    },
    {
      icon: Facebook,
      onClick: () => {},
    },
    {
      icon: Github,
      onClick: () => {},
    },
    {
      icon: Youtube,
      onClick: () => {},
    },
  ];
  const ourPages = [
    {
      name: "Tutorial",
      href: "/tutorial",
    },
    {
      name: "Play game",
      href: "https://algody.vercel.app",
    },
    {
      name: "Classroom",
      href: "/classroom",
    },
    {
      name: "Forum",
      href: "/forum",
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
    },
    {
      name: "About us",
      href: "/about-us",
    },
  ];
  return (
    <div className="relative pt-10">
      <div className="w-full h-fit bg-[#00171F] py-10 px-20 dark:bg-[#1b1b1f] border-t-1 border-[#cbd5e11a]">
        <MaxWidthWrapper>
          <div className="flex justify-between md:flex-row flex-col ">
            <div className="flex flex-col gap-5">
              <h1 className=" text-white tracking-wide text-2xl font-bold">
                Algorithmic Odyssey
              </h1>
              <div className="flex items-center gap-4">
                {socials.map((social, index) => (
                  <social.icon key={index} className="text-white w-6 h-6" />
                ))}
              </div>
              <div className="text-md text-white">
                09150429717
              </div>
              <div className="text-md text-white">
                algorithmicodyssey@gmail.com
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <h3 className="text-lg font-bold pb-8 text-gray-300">Our pages</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {ourPages.map((page)=> (
                      <Link href={page.href} key={page.name} className="text-white">
                     {page.name}
                      </Link>
                    ))}
                  </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex gap-4">
                <Mail className="h-5 w-5 text-white"/>
                <h4 className="text-white text-sm font-semibold w-full">
                Stay up to date on the latest from Algorithmic Odyssey
                </h4>
                </div>
                <div className="mt-5">
                    <Input type="email" placeholder="Enter your e-mail address" className="bg-transparent rounded-none px-5" color="default" size="md"/>
                </div>
                <div className="mt-5">
                    <Button className="px-10 text-lg font-bold text-black">
                        Subscribe
                    </Button>
                </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Footer;
