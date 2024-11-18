import { SearchResultProps } from "@/types/types";
import { Avatar } from "@nextui-org/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";

const SearchResult = ({
  searchResults,
  isLoading,
  isFetching,
  isRefetching,
}: {
  searchResults: SearchResultProps;
  isLoading: boolean;
  isFetching?: boolean;
  isRefetching?: boolean;
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
                <div className="border-b-1 border-gray-300 pb-2 py-1 px-3">People</div>
                <div className="flex flex-col space-y-2">
                  {searchResults.userData.map((user, index) => (
                    <Link
                        className="group flex items-center justify-between py-2 px-3 rounded-md space-x-2 transition-all duration-200 ease-in-out hover:bg-primary/10 hover:scale-105 hover:shadow-md"
                      key={index}
                      href={`/user/${user.username}`}
                    >
                       <div className="flex items-center space-x-2">  
                      <Avatar
                        showFallback
                        src={user.userImage as string}
                        size="sm"
                        className="border border-[#cbd5e11a]"
                      />
                      <p className="text-xs">{user.username}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  ))}
                </div>
              </Fragment>
            )}
            {searchResults?.forumData && searchResults.forumData.length > 0 && (
              <Fragment>
                <div className="border-b-1 border-gray-300 py-1 px-3">Forum</div>
                <div className="flex flex-col space-y-2">
                  {searchResults.forumData.map((forum, index) => (
                    <Link
                      className="group flex items-center justify-between py-2 px-3 rounded-md space-x-2 transition-all duration-200 ease-in-out hover:bg-primary/10 hover:scale-105 hover:shadow-md"
                      key={index}
                      href={`/forum/${forum.userId}/comments/${forum.titleId}/${forum.title}`}
                    >
                           <div className="flex items-center space-x-2">
                      <Avatar
                        showFallback
                        src={forum.forumImage as string}
                        size="sm"
                        className="border border-[#cbd5e11a]"
                      />
                      <p className="text-xs">{forum.title}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  ))}
                </div>
              </Fragment>
            )}

            {searchResults?.filteredAlgoData &&
              searchResults.filteredAlgoData.length > 0 && (
                <Fragment>
                  <div className="border-b-1 border-gray-300 py-1 px-3 ">
                    Algorithm
                  </div>
                  <div className="flex flex-col space-y-2">
                    {searchResults.filteredAlgoData.map((algo, index) => (
                  <Link
                  className="group flex items-center justify-between py-2 px-3 rounded-md space-x-2 transition-all duration-200 ease-in-out hover:bg-primary/10 hover:scale-105 hover:shadow-md"
                  key={index}
                  href={algo.href}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 group-hover:text-primary transition-colors duration-200">
                      {algo.icon}
                    </span>
                    <p className="text-sm text-gray-700 group-hover:text-primary transition-colors duration-200">
                      {algo.name}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
                    ))}
                  </div>
                </Fragment>
              )}
          </Fragment>
          {!isLoading &&
            !isRefetching &&
            !isFetching &&
            searchResults?.forumData &&
            searchResults.forumData.length === 0 &&
            searchResults.userData &&
            searchResults.userData.length === 0 &&
            searchResults.filteredAlgoData &&
            searchResults.filteredAlgoData.length === 0 && (
              <div className="flex items-center">No result found</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
