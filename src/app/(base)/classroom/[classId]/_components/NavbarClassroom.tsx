"use client";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { NavClasState } from "@/types/types";
import userInfo from "@/store/store";
export const NavbarClassroom = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { fetchUser, user } = userInfo();
  const [currentNav, setCurrentNav] = useState<NavClasState>("announcement");
  useEffect(() => {
    router.replace(`${pathname}?tab=${currentNav}`);
  }, [currentNav,pathname,router]);


  useEffect(()=> {
fetchUser();
  },[fetchUser])

  const navigationForStud = [
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

  const navigationForTeacher = [
    {
      name: "Announcement",
      isActive: currentNav === "announcement",
      value: "announcement",
    },

    {
      name: "Classwork",
      isActive: currentNav === "classwork",
      value: "classwork",
    },
  ]

  const navigation = user?.isStudent ? navigationForStud : navigationForTeacher

  const handleClick = (state: NavClasState) => {
    setCurrentNav((prevNav) => (prevNav = state));
  };
  return (
    <MaxWidthWrapper className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto flex md:justify-between justify-center items-center py-4">
        <div className=" flex space-x-4">
          {navigation.map((nav, index) => (
            <Fragment key={index}>
              <Button
                as={Link}
                href={`?tab=${currentNav}`}
                onClick={() => handleClick(nav.value as NavClasState)}
                className={`bg-transparent text-gray-600 font-medium hover:text-blue-700 py-2 lg:px-4 px-1 hover:bg-blue-100 rounded-sm rounded-b-md ${
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
