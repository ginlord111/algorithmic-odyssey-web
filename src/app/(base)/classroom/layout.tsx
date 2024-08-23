import Header from "@/components/layout/Header";
import React, { Fragment } from "react";
import { NavBar } from "./[classId]/_components/NavbarClassroom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header className="md:h-[40vh]" />
   
      {children}
    </Fragment>
  );
}
