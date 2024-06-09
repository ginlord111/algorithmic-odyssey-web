import React, { Suspense } from "react";
import Forum from "./_components/Forum";
const ForumPage = async() => {
  return (
    <Suspense>
        <Forum />
       </Suspense>
      
  );
};

export default ForumPage;
