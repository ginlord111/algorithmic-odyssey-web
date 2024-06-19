import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import AccountDetails from "./_components/AccountDetails";
import prisma from "@/db";

const Page = async ({ params }: { params: { username: string } }) => {
  const session = await getServerSession(authOptions);
  const { username } = params;
  const user = await prisma.user.findUnique({
    where: {
      username: decodeURIComponent(username),
    },
    select: {
      id: true,
    },
  });
  if (!user) return;

  /// TODO: RENDER ELSE CONDITION HERE FOR THE USER DETAILS
  return <div>{session?.user.id === user.id && <AccountDetails />}</div>;
};

export default Page;
