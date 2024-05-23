import React from "react";
import Forum from "./_components/Forum";
import Query from "@/components/tanstack-query/Query";
const page = () => {
  return (
    <Query>
      <Forum />
    </Query>
  );
};

export default page;
