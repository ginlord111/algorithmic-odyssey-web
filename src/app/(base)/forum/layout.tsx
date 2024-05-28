import SidebarForum from "@/components/forum/SidebarForum";
import Header from "@/components/layout/Header";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Header />
      <SidebarForum />
      {children}
    </Fragment>
  );
}
