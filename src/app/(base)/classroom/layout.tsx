import Header from "@/components/layout/Header";
import React, { Fragment } from "react";
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
