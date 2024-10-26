import React, { Fragment, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import SearchResult from "./SearchResult";
import Link from "next/link";
import { useParams } from "next/navigation";
const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceValue = useDebounce(searchValue, 1000);
  const containRef = useRef<HTMLDivElement>(null);
  const currentParams = useParams()
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

  /// TO REFRESH THE INPUT VALUE WHEN THE CURRENT URL CHANGE
useEffect(() => {
    setSearchValue("")
},[currentParams])
  return (
<Fragment>   
    <div ref={containRef}>
      <div className="relative w-[13rem] md:flex hidden">
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

      {/* MOBILE VIEW */}
      <Link className="relative block md:hidden"
      href={'/search'}
      >
        <Search className=" text-white w-5 h-5 ml-1   " />
      </Link>


    </div>
    </Fragment>
  );
};

export default SearchComponent;
