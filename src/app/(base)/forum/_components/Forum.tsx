"use client";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ForumContainer from "@/components/forum/ForumContainer";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Forum } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ForumSkeleton from "@/components/forum/ForumSkeleton";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FollowBtn from "@/app/user/[username]/_components/FollowBtn";
const Forums = () => {
  const searchParams = useSearchParams();
  const { replace,push } = useRouter();
  const pathname = usePathname();
  const [sortAs, setSortAs] = useState<string>(
    searchParams.get("sort") as "newest" | "oldest" | "popular"
  );
  const getForums = async ({ cursor }: { cursor: string }) => {
    const params = new URLSearchParams({
      cursor: cursor,
      sort: sortAs,
    });
    const forum = await fetch(`api/forum?${params}`);
    const response = await forum.json();
    const data = await response.data;
    return data;
  };

  const userLikeForums = async () => {
    const response = await fetch("api/forum/like");
    const data: any = await response.json();
    return data.userLikes;
  };

  const {
    data: userLikes,
    error,
    refetch: refetchUserLikes,
  } = useQuery({
    queryKey: ["user-likes"],
    queryFn: userLikeForums,
  });
  const {
    data,
    isSuccess,
    isPending,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: "",
    queryKey: ["forums"],
    queryFn: ({ pageParam = "" }) => getForums({ cursor: pageParam as string }),
    refetchOnWindowFocus:false,
    getNextPageParam: (lastPage) => {
      return Object.keys(lastPage).length !== 0
        ? lastPage?.metaData.lastCursor
        : undefined;
    },
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    replace(`${pathname}?sort=${sortAs ?? "oldest"}`, {
      scroll: false,
    });
    if (!sortAs) {
      setSortAs(searchParams.get("sort") as "newest" | "oldest" | "popular");
    }
    refetch();
    refetchUserLikes();
  }, [
    sortAs,
    setSortAs,
    pathname,
    replace,
    refetchUserLikes,
    refetch,
    searchParams,
  ]);
  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching]);
console.log(data?.pages, "DATA PAGES")
  return (
    <div>
      <MaxWidthWrapper>
        {/*border-l-1 border-gray-400*/}
        <div className="flex flex-col">
          {/* TODO: MOVE THIS BUTTON TO THE NAVBAR OR IN SIDEBAR*/}
          <div className="flex items-center justify-center w-full mt-10">
            <Button 
            onClick={()=>push("/new")}
            >Create Post</Button>
          </div>
          <div className="flex items-end w-full lg:justify-center justify-center mt-7">
            <Button
              variant="link"
              onClick={() => setSortAs((prev) => (prev = "popular"))}
              className={`${sortAs === "popular" && "underline"}`}
            >
              Popular
            </Button>
            <Button
              variant="link"
              onClick={() => setSortAs((prev) => (prev = "oldest"))}
              className={`${sortAs === "oldest" && "underline"}`}
            >
              Oldest
            </Button>
            <Button
              variant="link"
              onClick={() => setSortAs((prev) => (prev = "newest"))}
              className={`${sortAs === "newest" && "underline"}`}
            >
              Newest
            </Button>
            <Button
              variant="link"
              // onClick={() => setSortAs((prev) => (prev = "newest"))}
              // className={`${sortAs === "newest" && "underline"}`}
            >
              Following
            </Button>
          </div>
          {isSuccess && !isPending && !isLoading && !isRefetching ? (
            data.pages.map(
              (page) =>
                page.data &&
                page.data.map(
                  (
                    forum: Forum & {
                      _count: { forumLikes: number; comments: number };
                    },
                    index: number
                  ) => (
                 <Fragment>
                  {page.data.length === index +1 ? (
                       <div key={index} ref={ref}>
                       <ForumContainer {...forum} userLikes={userLikes} followBtnComponent={<FollowBtn  followingId={forum.userId} className="mt-0"/>}/>
                     </div>
                  ): (
                    <div key={index}>
                       <ForumContainer {...forum} userLikes={userLikes} followBtnComponent={<FollowBtn  followingId={forum.userId} className="mt-0"/>}/>
                    </div>
                  )}
                 </Fragment>
                  )
                )
            )
          ) : (
            <ForumSkeleton />
          )}
          {isFetchingNextPage && <ForumSkeleton />}
          {!hasNextPage && !isPending && !isLoading && (
            <div className="relative mt-10 mx-[130px]">
              <div className="flex items-center inset-0 absolute ">
                <span className=" border-t w-full border-1 border-gray-500"></span>
              </div>
              <div className="relative flex justify-center items-center  font-bold">
                <span className="text-muted-foreground text-md px-3 bg-[#eff1f5] whitespace-nowrap">
                  No more posts
                </span>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Forums;
