import React from "react";
import { Avatar,Button } from "@nextui-org/react";
import { ThumbsUp,MessageSquareText } from 'lucide-react';
import Image from "next/image";
const PostContainer = () => {
  return (
    <div className="relative pt-20 max-w-4xl flex ">
      <div className="h-[100vh] w-full">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row gap-2 justify-start text-xs ">
            <Avatar
              showFallback
              src="https://images.unsplash.com/broken"
              size="sm"
            />
            <p className=" tracking-wide">Name</p>
            {/* <strong className='pl-1'>.</strong> */}
            <p className="text-gray-500">2 wks ago</p>
          </div>
          <div className="text-lg font-bold tracking-wider pt-5 title pb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div className="text-sm text-gray-500 tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div className="md:h-[45vh] h-[30vh] relative w-full">
    <Image
      src="https://img.itch.zone/aW1hZ2UvOTMyNjc3LzU0NzM5MjMuZ2lm/347x500/dFxgtd.gif"
      alt="Animated GIF"
      className="brightness-50 object-cover w-full  rounded-lg mt-2"
      fill
      priority
    />
  </div>

          <div className="flex flex-row gap-4 mt-4">
          <Button isIconOnly size="sm">
        <ThumbsUp  className="h-5 w-5"/>
          </Button>
          <Button isIconOnly size="sm">
        <MessageSquareText  className="h-5 w-5"/>
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
