"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/style.css";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

const VisualComponent = () => {
  const [inputA, setInputA] = useState<number | "">("");
  const [inputB, setInputB] = useState<number | "">("");
  const [log, setLog] = useState<string>("");
  const [gcd, setGcd] = useState<number | null>(null);

  const updateBars = (a: number, b: number) => {
    setLog(
      (prev) => `${prev}Calculating: a = ${a}, b = ${b}, a % b = ${a % b}\n`
    );
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const euclideanAlgorithm = async (a: number, b: number) => {
    setLog(`Starting with a = ${a}, b = ${b}\n`);
    while (b !== 0) {
      updateBars(a, b);
      await sleep(1000);
      const temp = b;
      b = a % b;
      a = temp;
    }
    setGcd(a);
    setLog((prev) => `${prev}GCD is ${a}`);
  };

  const handleStart = () => {
    const a = Number(inputA);
    const b = Number(inputB);
    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      setGcd(null);
      euclideanAlgorithm(a, b);
    } else {
      setLog("Please enter valid positive numbers.");
    }
  };

  return (
    <div className="container max-w-full justify-center py-10">
      <div className="flex flex-col items-center">
        <div id="bars" className="flex justify-center items-end h-80 m-5">
          <div
            className="bar w-24 mr-2 bg-lightblue border border-blue flex items-end justify-center relative"
            style={{ height: `${inputA}px` }}
          >
            <span className="absolute bottom-1 text-black">{inputA}</span>
          </div>
          <div
            className="bar w-24 mr-2 bg-lightblue border border-blue flex items-end justify-center relative"
            style={{ height: `${inputB}px` }}
          >
            <span className="absolute bottom-1 text-black">{inputB}</span>
          </div>
        </div>
        <div className="log text-left mb-4">
          <pre>{log}</pre>
        </div>
        <p>{gcd !== null ? `GCD is ${gcd}` : ""}</p>
        <div className="controls flex flex-col md:flex-row justify-center">
          <input
            type="number"
            value={inputA}
            onChange={(e) => setInputA(Number(e.target.value))}
            className="border px-2 py-1 w-32 border-black z-40"
            placeholder="Enter first number"
          />
          <input
            type="number"
            value={inputB}
            onChange={(e) => setInputB(Number(e.target.value))}
            className="border px-2 py-1 w-32 border-black z-40 md:ml-1 mt-2 md:mt-0"
            placeholder="Enter second number"
          />
          <button
            onClick={handleStart}
            className="border px-2 py-1 border-black z-40 md:ml-1 mt-2 md:mt-0"
          >
            Start Euclidean Algorithm
          </button>
        </div>
      </div>
    </div>
  );
};

const contents = [
  {
    desc: "Euclid's Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Euclid's Algorithm is a method for finding the greatest common divisor (GCD) of two numbers. 
      The GCD is the largest number that divides both numbers without leaving a remainder.`,
    imageSrc: "/lessons/img/euclid-algorithm/euclid.png",
    audioSrc: "/audio/euclid-algorithm/intro.mp3",
  },
  {
    desc: `To use Euclid's Algorithm, divide the larger number by the smaller number and find the remainder. 
      Replace the larger number with the smaller number and the smaller number with the remainder. 
      Repeat this process until the remainder is zero. The non-zero remainder just before reaching zero is the GCD.`,
    imageSrc: "/lessons/img/euclid-algorithm/understanding.png",
    audioSrc: "/audio/euclid-algorithm/works.mp3",
  },
  {
    desc: `Euclid's Algorithm is highly efficient and handles large numbers well due to its simple iterative division process, 
      making it suitable for various applications. However, it may involve multiple division steps, which can be computationally intensive for very large numbers, 
      and understanding and implementing it might be challenging for those new to mathematical algorithms.`,
    imageSrc: "/lessons/img/euclid-algorithm/how.png",
    audioSrc: "/audio/euclid-algorithm/benefits.mp3",
  },
  {
    component: <VisualComponent />,
  },
];

const AlgorithmPage = () => {
  const [slide, setSlide] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sliderConfig, setSliderConfig] = useState({
    isBegin: true,
    isEnd: index === (contents.length ?? 0) - 1,
  });
  useEffect(() => {
    slide?.on("slideChange", ({ activeIndex }) => setIndex(activeIndex));
    setSliderConfig({
      isBegin: index === 0,
      isEnd: index === contents.length - 1,
    });
  }, [slide, contents, index]);

  const hiddenIcon = "hidden text-gray-400";
  if (audioRef.current && isMuted === false) {
    audioRef.current.src = contents[index].audioSrc as string;
    audioRef.current.play();
  }

  const handleMute = () => {
    if (audioRef.current && isMuted === false) {
      setIsMuted(true);
      audioRef.current?.pause();
      audioRef.current.currentTime = 0;
    } else {
      setIsMuted(false);
      audioRef.current?.play();
    }
  };

  return (
    <div>
      <textarea
        id="ide"
        className="hidden z-50 md:w-96 w-80 h-96 pl-2 bg-black bottom-10 md:right-10 right-4 md:text-base text-sm text-green-400 resize-none"
        readOnly
      ></textarea>

      <audio ref={audioRef}>
        <source type="audio/mpeg" />
      </audio>
      <div className="md:px-20 md:py-20 py-3 px-2 h-screen bg-slate-200 relative">
        <Swiper
          pagination={{
            renderBullet: (_, className) =>
              `<span class="roundedFull transition ${className}"></span>`,
          }}
          onSwiper={(swiper) => setSlide(swiper)}
          modules={[Pagination]}
          className="bg-white w-full h-full rounded-md flex  flex-col-reverse "
          slidesPerView={1}
          spaceBetween={50}
        >
          <div className="flex justify-end mx-10 mt-10">
            {isMuted ? (
              <VolumeX
                className="md:w-16 md:h-16 h-10 w-10"
                onClick={handleMute}
              />
            ) : (
              <Volume2
                className="md:w-16 md:h-16 h-10 w-10"
                onClick={handleMute}
              />
            )}
          </div>

          {contents.map((content, index) => {
            return (
              <SwiperSlide className="-z-10 relative h-full w-full">
                {content.component ? (
                  content.component
                ) : (
                  <div
                    className="flex flex-col items-center justify-center w-full h-full md:space-y-4 space-y-1"
                    key={index}
                  >
                    {content.imageSrc && (
                      <div className="relative md:w-[400px] md:h-[250px] w-[200px] h-[100px] md:text-md text-xs overflow-auto">
                        <Image
                          src={content.imageSrc}
                          layout="fill"
                          alt="CONTENT IMAGE"
                        />
                      </div>
                    )}
                    <div
                      className={`${
                        content.className && content.className
                      } mx-2 md:mx-20`}
                    >
                      {content.desc}
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            slide?.slidePrev();
          }}
          className={cn(
            `swiper-button-prev absolute top-1/2 -translate-y-1/2 left-[5%] p-2 z-50`,

            "transition",
            sliderConfig.isBegin && hiddenIcon
          )}
        >
          <ChevronLeft className="md:w-14 md:h-14 w-8 h-8 hover:text-blue-500 transition" />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            slide?.slideNext();
          }}
          className={cn(
            `swiper-button-next absolute top-1/2 -translate-y-1/2 right-[5%] p-2 z-50`,
            sliderConfig.isEnd && hiddenIcon
          )}
        >
          <ChevronRight className="md:w-14 md:h-14 w-8 h-8 hover:text-blue-500 transition" />
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
