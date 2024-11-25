import React, { Fragment, useEffect, useRef, useState } from "react";
import { Search,BookText} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import SearchResult from "./SearchResult";
import Link from "next/link";
import { useParams } from "next/navigation";

const algoData = {
  algoData: [
    {
      name: "What is an Algorithm",
      href: "https://algo-thesis.onrender.com/lessons/intro-to-algorithms.html",
      icon: <BookText />,
    },
    {
      name: "Bubble Sort",
      href: "https://algo-thesis.onrender.com/bubble-sort",
      icon: <BookText />,
    },
    {
      name: "Insertion Sort",
      href: "https://algo-thesis.onrender.com/insertion-sort",
      icon: <BookText />,
    },
    {
      name: "Selection Sort",
      href: "https://algo-thesis.onrender.com/selection-sort",
      icon: <BookText />,
    },
    {
      name: "Merge Sort",
      href: "https://algo-thesis.onrender.com/merge-sort",
      icon: <BookText />,
    },
    {
      name: "Quick Sort",
      href: "https://algo-thesis.onrender.com/quick-sort",
      icon: <BookText />,
    },
    {
      name: "Linear Search",
      href: "https://algo-thesis.onrender.com/linear-search",
      icon: <BookText />,
    },
    {
      name: "Binary Search",
      href: "https://algo-thesis.onrender.com/binary-search",
      icon: <BookText />,
    },
    {
      name: "Sequential Search",
      href: "https://algo-thesis.onrender.com/sequential-search",
      icon: <BookText />,
    },
    {
      name: "Euclidean Algorithm",
      href: "https://algo-thesis.onrender.com/euclidean-algorithm",
      icon: <BookText />,
    },
    {
      name: "Knuth-Morris-Pratt Algorithm",
      href: "https://algo-thesis.onrender.com/kmp-algorithm",
      icon: <BookText />,
    },
    {
      name: "Breadth-First-Search",
      href: "https://algo-thesis.onrender.com/breadth-first-search",
      icon: <BookText />,
    },
    {
      name: "Depth-First-Search",
      href: "https://algo-thesis.onrender.com/depth-first-search",
      icon: <BookText />,
    },
  ],
};

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceValue = useDebounce(searchValue, 1000);
  const containRef = useRef<HTMLDivElement>(null);
  const currentParams = useParams()
  const params = new URLSearchParams({
    query: debounceValue,
  });
  let {
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
        const filteredAlgoData = algoData.algoData.filter((data)=>data.name.toLowerCase().includes(debounceValue.toLowerCase()))
        const withAlgoData = await {...res, filteredAlgoData}
        return withAlgoData;
        }
        else{
          return []
        }
      }
      return [];
    },
  });

console.log(seachResult, "WITH ALGO DATA")
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
          className="bg-[#FFFF] focus:outline-none text-[#242424] placeholder-gray-400 font-normal rounded-full pl-8"
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
