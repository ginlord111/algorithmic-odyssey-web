import SidebarForum from "@/components/forum/SidebarForum";
import Header from "@/components/layout/Header";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header/>
      <MaxWidthWrapper > {children}</MaxWidthWrapper>
    </Fragment>
  );
}
