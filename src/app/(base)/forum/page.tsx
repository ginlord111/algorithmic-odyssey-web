import React from "react";
import Forum from "./_components/Forum";
import Query from "@/components/tanstack-query/Query";
import NextAuthProvider from "@/components/provider/NextAuthProvider";
const page = () => {
  return (

    <Query>
          <NextAuthProvider> 
      <Forum />
      </NextAuthProvider>
    </Query>

  );
};

export default page;
