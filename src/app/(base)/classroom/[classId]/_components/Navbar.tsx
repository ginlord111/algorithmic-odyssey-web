"use client";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { NavState } from "@/types/types";
export const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentNav, setCurrentNav] = useState<NavState>("announcement");
  useEffect(() => {
    router.replace(`${pathname}?tab=${currentNav}`);
  }, [currentNav]);

  const navigation = [
    {
      name: "Announcement",
      isActive: currentNav === "announcement",
      value: "announcement",
    },
    {
      name: "Pending task",
      isActive: currentNav === "pending-task",
      value: "pending-task",
    },
    {
      name: "Graded task",
      isActive: currentNav === "graded-task",
      value: "graded-task",
    },
  ];

  const handleClick = (state: NavState) => {
    setCurrentNav((prevNav) => (prevNav = state));
  };
  return (
    <MaxWidthWrapper className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className=" flex space-x-4">
          {navigation.map((nav, index) => (
            <Fragment key={index}>
              <Button
                as={Link}
                href={`?tab=${currentNav}`}
                onClick={() => handleClick(nav.value as NavState)}
                className={`bg-transparent text-gray-600 font-medium hover:text-blue-700 py-2 px-4 hover:bg-blue-100 rounded-sm rounded-b-md ${
                  nav.isActive && "text-blue-600 border-b-5 border-blue-600 "
                }`}
              >
                {nav.name}
              </Button>
            </Fragment>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
