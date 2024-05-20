import React from "react";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
const LandingPage = () => {
  return (
    <div className="relative">
      <div className="md:h-[70vh] h-[100vh] relative flex flex-col">
        <Image
          src="https://img.itch.zone/aW1hZ2UvOTMyNjc3LzU0NzM5MjMuZ2lm/347x500/dFxgtd.gif"
          alt="Animated GIF"
          className="brightness-50 object-cover"
          fill
        />
        <div className=" mx-auto w-full max-w-screen-xl px-2.5 md:px-20 relative flex flex-col justify-center md:items-start items-center h-full gap-5 text-center md:text-start">
          <div className="font-bold md:text-[60px] text-[30px] max-w-2xl text-white">
            Unlock Algorithm Skills with Every Level
          </div>
          <div className="text-lg font-bold tracking-wide text-white">
            <p>
              Embark on a 2D Gaming Journey to Master Algorithms and Boost Your
              Problem-Solving Abilities
            </p>
          </div>
          <div className="w-fit mt-16">
            <Link
              href={"#"}
              className="bg-white p-3 px-6 rounded-md text-lg font-bold text-[#333F67]"
            >
              Download Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
