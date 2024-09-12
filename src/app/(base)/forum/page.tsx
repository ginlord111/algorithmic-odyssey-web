import React, { Suspense } from "react";
import Forum from "./_components/Forum";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
const ForumPage = async() => {
  const session = await getServerSession(authOptions)

  return (
    <Suspense>
        <Forum userId={session?.user.id as string | null}/>
       </Suspense>
      
  );
};

export default ForumPage;
