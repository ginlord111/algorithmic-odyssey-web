import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { Forum, User } from "@prisma/client";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
interface SearchResultProps {
  forumData: Forum[];
  userData: User[];
}
const SearchResult = ({
  searchResults,
  isLoading,
  isFetching,
  isRefetching,
}: {
  searchResults: SearchResultProps;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
}) => {
  return (
    <div className="absolute bg-white w-[17rem] top-[3.5rem] shadow-lg rounded-md">
      <div className="absolute top-[-6px] left-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
      <div className="p-4 text-sm font-normal">
        {isLoading ||
          (isRefetching && isFetching && (
            <div className="flex items-center justify-center ">
              <Loader2 className="h-6 w-6 animate-spin  text-black " />
            </div>
          ))}
        <div className="relative text-black font-normal">
          <Fragment>
            {searchResults.userData && searchResults.userData.length > 0 && (
              <Fragment>
                <div className="border-b-1 border-gray-300 pb-2">People</div>
                <div className="flex flex-col space-y-2">
                  {searchResults.userData.map((user) => (
                    <Link
                      className="flex items-center space-x-2 pt-2"
                      key={user.userId}
                      href={`/user/${user.username}`}
                    >
                      <Avatar
                        showFallback
                        src={user.userImage as string}
                        size="sm"
                        className="border border-[#cbd5e11a]"
                      />
                      <p className="text-xs">{user.username}</p>
                    </Link>
                  ))}
                </div>
              </Fragment>
            )}
            {searchResults.forumData && searchResults.forumData.length > 0 && (
              <Fragment>
                <div className="border-b-1 border-gray-300 py-2">Forum</div>
                <div className="flex flex-col space-y-2">
                  {searchResults.forumData.map((forum) => (
                    <Link
                      className="flex items-center space-x-2 pt-2"
                      key={forum.userId}
                      href={`/forum/${forum.userId}/comments/${forum.titleId}/${forum.title}`}
                    >
                      <Avatar
                        showFallback
                        src={forum.forumImage as string}
                        size="sm"
                        className="border border-[#cbd5e11a]"
                      />
                      <p className="text-xs">{forum.title}</p>
                    </Link>
                  ))}
                </div>
              </Fragment>
            )}
          </Fragment>
          {!isLoading &&
            !isRefetching &&
            !isFetching &&
            searchResults.forumData &&
            searchResults.forumData.length === 0 &&
            searchResults.userData &&
            searchResults.userData.length === 0 && (
              <div className="flex items-center">No result found</div>
            )}
        </div>
      </div>
    </div>
  );
};
const SearchPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceValue = useDebounce(searchValue, 1000);
  const containRef = useRef<HTMLDivElement>(null);
  const params = new URLSearchParams({
    query: debounceValue,
  });
  const {
    data: seachResult,
    isLoading,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ["search-data", debounceValue],
    initialData: [],
    queryFn: async () => {
      if (debounceValue) {
        const data = await fetch(`/api/search?${params}`);
        if(data.ok && data.status === 200){
        const res = await data.json();
        return res;
        }
        else{
          return []
        }
      }
      return [];
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containRef.current &&
        !containRef.current.contains(e.target as Node)
      ) {
        setSearchValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containRef, searchValue]);

  return (
<Fragment>   
    <div ref={containRef}>
      <div className="relative w-[13rem] ">
        <div className="absolute top-2 left-1">
          <Search className=" text-[#000000CC] w-5 h-5 ml-1   " />
        </div>
        <Input
          placeholder="Search"
          className="bg-[#F7EAD9] focus:outline-none text-[#242424] placeholder-gray-400 font-normal rounded-full pl-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {searchValue && debounceValue && seachResult && (
        <SearchResult
          searchResults={seachResult}
          isLoading={isLoading}
          isRefetching={isRefetching}
          isFetching={isFetching}
        />
      )}

 


    </div>
    </Fragment>
  );
};

export default SearchPage;
