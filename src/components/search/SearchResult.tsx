import { SearchResultProps } from "@/types/types";
import { Avatar } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
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
                <div className="border-b-1 border-gray-300 pb-2">People</div>
                <div className="flex flex-col space-y-2">
                  {searchResults.userData.map((user, index) => (
                    <Link
                      className="flex items-center space-x-2 pt-2"
                      key={index}
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
            {searchResults?.forumData && searchResults.forumData.length > 0 && (
              <Fragment>
                <div className="border-b-1 border-gray-300 py-2">Forum</div>
                <div className="flex flex-col space-y-2">
                  {searchResults.forumData.map((forum, index) => (
                    <Link
                      className="flex items-center space-x-2 pt-2"
                      key={index}
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

            {searchResults?.filteredAlgoData &&
              searchResults.filteredAlgoData.length > 0 && (
                <Fragment>
                  <div className="border-b-1 border-gray-300 py-2">
                    Algorithm
                  </div>
                  <div className="flex flex-col space-y-2">
                    {searchResults.filteredAlgoData.map((algo, index) => (
                      <Link
                        className="flex items-center space-x-2 pt-2"
                        key={index}
                        href={algo.href}
                      >
                        {algo.icon}
                        <p className="text-xs">{algo.name}</p>
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
