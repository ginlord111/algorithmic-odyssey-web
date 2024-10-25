"use client";
import React, { Fragment, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/types/form-types";
import { z } from "zod";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { SearchResultProps } from "@/types/types";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
const SearchResultMobile = ({
  searchResults,
}: {
  searchResults: SearchResultProps;
}) => {
  return (
    <div className="relative w-full h-fit bg-white p-3 border rounded-sm">
      <div className="flex items-start w-full justify-start font-bold pl-3">
        Result
      </div>
      <div className="flex  flex-col w-full pt-2 space-y-3">
        {searchResults?.userData && searchResults.userData.length > 0 && (
          <Fragment>
            {searchResults.userData.map((user) => (
              <Link
                className="flex rounded-sm border py-2 w-full items-center space-x-4 px-3 "
                key={user.userId}
                href={`/23`}
              >
                <Avatar
                  showFallback
                  src={user.userImage as string}
                  size="sm"
                  className="border border-[#cbd5e11a]"
                />
                <p className="text-xs">{user.username}</p>
                <p className="text-sm text-end flex-1 ">People</p>
              </Link>
            ))}
          </Fragment>
        )}

        {searchResults?.forumData && searchResults.forumData.length > 0 && (
          <Fragment>
            {searchResults.forumData.map((forum) => (
              <Link
                className="flex rounded-sm border py-2 w-full items-center space-x-4 px-3 "
                key={forum.id}
                href={`/23`}
              >
                <Avatar
                  showFallback
                  src={forum.userImage as string}
                  size="sm"
                  className="border border-[#cbd5e11a]"
                />
                <p className="text-xs">{forum.title}</p>
                <p className="text-sm text-end flex-1 ">Publication</p>
              </Link>
            ))}
          </Fragment>
        )}
      </div>
      <div className="text-center text-muted-foreground text-sm pt-2">
        End of result
      </div>
    </div>
  );
};
const SearchMobileView = ({className}:{className?:string}) => {
  const [searchResults, setSearchResults] = useState<SearchResultProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathaname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    setIsLoading(true);
    router.replace(`${pathaname}?q=${values.search}`);

    const params = new URLSearchParams({
      query: values.search,
    });
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();
    console.log(data, "DATAA");
    setSearchResults(data);
    setIsLoading(false);
  }
  return (
    <div className={`flex items-center w-full justify-center pt-4 flex-col space-y-14 ${className}`}>
      <div className="relative w-[13rem] ">
        <div className="absolute top-2 left-1">
          <Search className=" text-[#000000CC] w-5 h-5 ml-1   " />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search"
                      className="bg-[#F7EAD9] focus:outline-none text-[#242424] placeholder-gray-400 font-normal rounded-full pl-8"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {isLoading ? (
        <Loader2 className="animate-spin h-8 w-8" />
      ) : searchResults && !isLoading ? (
        <SearchResultMobile
          searchResults={searchResults as SearchResultProps}
        />
      ) : null}
    </div>
  );
};

export default SearchMobileView;
