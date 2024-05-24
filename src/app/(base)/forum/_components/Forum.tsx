"use client";
import React, { useEffect,Fragment } from "react";
import { useInView } from "react-intersection-observer";
import ForumContainer from "@/components/forum/ForumContainer";
import Header from "@/components/layout/Header";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Forum } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ForumSkeleton from "@/components/forum/ForumSkeleton";
const Forums = () => {
  const getForums = async ({ cursor }: { cursor: string }) => {
    const params = new URLSearchParams({
      cursor: cursor,
    });
    const forum = await fetch(`api/forum?${params}`);
    const response = await forum.json();
    const data = await response.data;
    return data;
  };
  const {
    data,
    isSuccess,
    isPending,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: "",
    queryKey: ["forums"],
    queryFn: ({ pageParam = "" }) => getForums({ cursor: pageParam as string }),
    getNextPageParam: (lastPage) => {
      return Object.keys(lastPage).length !== 0
        ? lastPage?.metaData.lastCursor
        : undefined;
    },
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);
  console.log(data, "DATAAAA");
  return (
    <div>
      <Header />
      <MaxWidthWrapper className="flex justify-center">
        <div className="flex flex-col">
          {isSuccess && !isPending && !isLoading ? (
            data.pages.map(
              (page) =>
                page.data &&
                page.data.map((forum: Forum) => (
                  <div key={forum.userId} ref={ref}>
                    <ForumContainer {...forum} />
                  </div>
                ))
            )
          ) : (
            <ForumSkeleton />
          )}
          {isFetchingNextPage && <ForumSkeleton />}
          {!hasNextPage && !isPending && !isLoading && (
            <div className="font-bold py-4 flex items-center w-full text-center justify-center">
              -------------No more post-------------
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Forums;
