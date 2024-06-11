"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ForumContainer from "@/components/forum/ForumContainer";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Forum } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ForumSkeleton from "@/components/forum/ForumSkeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Forums = () => {
  const searchParams = useSearchParams();
  const { replace} = useRouter();
  const pathname = usePathname();
  const [sortAs, setSortAs] = useState<"oldest" | "newest" | "popular">(
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
    refetch,
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
    if (!sortAs) {
      setSortAs((searchParams.get("sort") as "newest" || "oldest" || "popular"));
    }
    replace(`${pathname}?sort=${sortAs ?? "newest"}`, {
      scroll: false,
    });
    refetch();
    refetchUserLikes();
  }, [sortAs, setSortAs, pathname, replace, refetchUserLikes]);
  useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage && !isRefetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isRefetching]);
  console.log(data, "THIS IS DATA FORUM")
  return (
    <div>
      <MaxWidthWrapper className="flex justify-center  ">
        {" "}
        {/*border-l-1 border-gray-400*/}
        <div className="flex flex-col">
          {/* TODO: MOVE THIS BUTTON TO THE NAVBAR OR IN SIDEBAR*/}
          <Link href="/new" className="flex items-center justify-center mt-5">
            <Button>Create Post</Button>
          </Link>
          <div className="flex items-end w-full justify-end ">
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
                    <div key={index} ref={ref}>
                      <ForumContainer {...forum} userLikes={userLikes} />
                    </div>
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
                <span className=" border-t w-full border-1 border-gray-500">
                  {" "}
                </span>
              </div>
              <div className="relative flex justify-center items-center  font-bold">
                <span className="text-muted-foreground text-md px-3 bg-[#eff1f5]">
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
