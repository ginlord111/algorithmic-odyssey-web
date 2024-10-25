"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
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
const SearchResultMobile = () => {
  return <div className="">dsadsa</div>;
};
const SearchMobileView = () => {
  const [searchResults, setSearchResults] = useState<SearchResultProps>();
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
    router.replace(`${pathaname}?q=${values.search}`);

    const params = new URLSearchParams({
      query: values.search,
    });
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();
    console.log(data, "DATAA");
    setSearchResults(data);
  }

  return (
    <div className="flex md:hidden items-center w-full justify-center pt-4 flex-col space-y-14 ">
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

      <div className="relative w-full">
        <div className="flex items-start w-full justify-start font-bold pl-3">
          Result
        </div>
        <div className="flex  flex-col w-full">
        <Link className="flex w-full items-center space-x-4 px-3 pt-2" key={"dsa"} href={`/23`}>
  <Avatar
    showFallback
    src={"https://res.cloudinary.com/dv6qpahip/image/upload/v1727508639/algorithmic-oddysey/aj5nounoh7r6cpwhlgws.webp"}
    size="sm"
    className="border border-[#cbd5e11a]"
  />
  <p className="text-xs">Ronnie</p>
  <p className="ml-auto">People</p>
</Link>
        </div>
      </div>
    </div>
  );
};

export default SearchMobileView;
