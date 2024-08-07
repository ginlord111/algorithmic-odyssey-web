import Header from "@/components/layout/Header";
import React, { Fragment } from "react";
import { NavBar } from "./_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
        <NavBar />
      {children}
    </Fragment>
  );
}