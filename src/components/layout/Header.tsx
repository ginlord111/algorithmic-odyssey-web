import React, { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
const Header = ({
  children,
  className,
  title,
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={cn(
        "md:h-[50vh] h-[40vh] relative flex flex-col bg-gradient-to-r bg-gray-700 bg-blend-multiply text-white",
        className
      )}
    >
      {/* TODO: USE DIFFERENT IMAGE PER LOAD JUST LIKE GODOT WEBSITE */}

      <Image
        src="/giffy.gif"
        alt="Animated GIF"
        className="brightness-50 object-cover bg-gradient-to-r bg-gray-700 bg-blend-multiply text-white "
        fill
        priority
        unoptimized
      />
      {title && (
        <div className="mx-auto w-full max-w-screen-sm px-2.5 md:px-20 relative flex flex-col justify-center md:items-start items-center h-full">
          <div className="font-bold md:text-[60px] text-[30px] text-center w-full text-[#EBF2FA]">
            {title}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Header;
