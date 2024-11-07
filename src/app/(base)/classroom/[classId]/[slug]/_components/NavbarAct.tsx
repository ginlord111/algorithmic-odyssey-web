"use client";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import userInfo from "@/store/store";
import { NavActState } from "@/types/types";
export const NavBarAct = ({isActivity}:{isActivity:boolean}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { fetchUser, user } = userInfo();
  const [currentNav, setCurrentNav] = useState<NavActState>("instruction");
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab")
  useEffect(() => {
    router.replace(`${pathname}?tab=${currentNav}`);
  }, [currentNav,pathname,router]);


  useEffect(()=> {
fetchUser();
  },[fetchUser])

  const navigationForStud = [
    {
      name: "Instruction",
      isActive: currentTab === "instruction",
      value: "instruction",
    },
    {
      name: isActivity ? "Work" : "Compiler",
      isActive:isActivity ? currentTab === "students-work" : currentNav ==="compiler",
   value: isActivity ? "students-work" : "compiler"
    },
    // {
    //   name:"Compiler",
    //   isActive: currentNav === "compiler",
    //   value:"compiler"
    // }
  ];

  const navigationForTeacher = [
    {
        name: "Instruction",
        isActive: currentTab === "instruction",
        value: "instruction",
      },
      {
        name: "Student's Work",
        isActive: currentTab === "students-work",
        value:"students-work"
      },
      {
        name:"Compiler",
        isActive: currentTab === "compiler",
        value:"compiler"
      }
  ]

  const navigation = user?.isStudent ? navigationForStud : navigationForTeacher

  const handleClick = (state: NavActState) => {
    setCurrentNav((prevNav) => (prevNav = state));
  };
  console.log(currentTab,currentNav, "currentTab")
  useEffect(() => {
    if(currentTab!=="instruction" && currentTab){
      router.replace(`${pathname}?tab=${currentTab}`);
    }
}, [currentTab])
  return (
    <MaxWidthWrapper className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className=" flex space-x-4">
          {navigation.map((nav, index) => (
            <Fragment key={index}>
              <Button
                as={Link}
                href={`?tab=${currentNav}`}
                onClick={() => handleClick(nav.value as NavActState)}
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
