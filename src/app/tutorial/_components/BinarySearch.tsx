"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

const VisualComponent = () => {
    const [array, setArray] = useState<number[]>(randomizeArray(7).sort((a, b) => a - b));
    const [target, setTarget] = useState<number | string>('');
    const [result, setResult] = useState<string>('');
    const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [inputArray, setInputArray] = useState<string>('');
  
    // Helper function to create a random array
    function randomizeArray(length: number): number[] {
      return Array.from({ length }, () => Math.floor(Math.random() * 100) + 10);
    }
  
    // Function to create a bar for each element
    const createBar = (value: number, index: number) => {
      let barClass = 'bg-[lightblue] border-blue-600 border-2';
      if (highlightIndexes.includes(index)) {
        barClass = 'bg-orange-500';
      }
      if (index === foundIndex) {
        barClass = 'bg-green-500';
      }
  
      return (
        <div
          key={index}
          className={`flex items-end justify-center relative ${barClass}`}
          style={{ height: `${value}px`, width: '30px', margin: '2px' }}
        >
          <span className="absolute bottom-1 text-black">{value}</span>
        </div>
      );
    };
  
    // Function to update the bars (this is effectively the return JSX in React)
    const updateBars = () => {
      return array.map((value, index) => createBar(value, index));
    };
  
    // Binary Search Algorithm
    const binarySearch = async (arr: number[], target: number) => {
      let left = 0;
      let right = arr.length - 1;
  
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        setHighlightIndexes([mid]);
        setResult(`Checking middle element: ${arr[mid]}`);
        await sleep(1000);
  
        if (arr[mid] === target) {
          setResult(`Target ${target} found at index ${mid}`);
          setFoundIndex(mid);
          return;
        } else if (arr[mid] < target) {
          setResult(`Target is greater than ${arr[mid]}`);
          left = mid + 1;
        } else {
          setResult(`Target is less than ${arr[mid]}`);
          right = mid - 1;
        }
  
        await sleep(1000);
      }
  
      setResult(`Target ${target} not found in the array`);
    };
  
    // Utility function to simulate sleep
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    // Reset function to randomize a new array
    const reset = () => {
      const newArray = randomizeArray(7).sort((a, b) => a - b);
      setArray(newArray);
      setInputArray('');
      setResult('');
      setHighlightIndexes([]);
      setFoundIndex(null);
    };
  
    // Set the array from input
    const setArrayFromInput = () => {
      const numbers = inputArray
        .split(',')
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !isNaN(num));
  
      if (numbers.length > 0) {
        const sortedArray = numbers.sort((a, b) => a - b);
        setArray(sortedArray);
        setResult('');
        setHighlightIndexes([]);
        setFoundIndex(null);
      }
    };
  
    // Event handler for search
    const handleSearch = () => {
      const parsedTarget = parseInt(target as string, 10);
      if (!isNaN(parsedTarget)) {
        setFoundIndex(null);
        binarySearch(array, parsedTarget);
      }
    };
  
    return (
      <div className="container max-w-full justify-center py-10">
        <div id="array" className="flex justify-center items-end" style={{ height: '300px' }}>
          {updateBars()}
        </div>
        <p id="result" className="mt-4 text-center">
          {result}
        </p>
        <div className="controls flex flex-col md:flex-row items-center justify-center mt-4 space-x-2">
          <button onClick={reset} className="border md:px-1 md:py-1 mr-2 border-black rounded-sm">
            Randomize Array
          </button>
          <div className="flex flex-row items-center">
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Enter target number"
              className="border md:px-1 md:py-1 w-36 md:w-72 border-black rounded-sm"
            />
            <button
              onClick={handleSearch}
              className="border md:px-1 md:py-1 ml-2 border-black rounded-sm"
            >
              Search Array
            </button>
          </div>
          <div className="flex flex-row items-center md:mt-0 mt-2">
            <input
              type="text"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              placeholder="Enter custom array (comma-separated)"
              className="border md:px-1 md:py-1 w-36 md:w-72 border-black rounded-sm"
            />
            <button onClick={setArrayFromInput} className="border md:px-1 md:py-1 ml-2 border-black rounded-sm">
              Set Array
            </button>
          </div>
        </div>
      </div>
    );
  };


  
  


const contents = [
  {
    desc: "Binary Search Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. 
    The idea behind binary search is to take advantage of the fact that the array is sorted to reduce the time complexity to O(log N).`,
    imageSrc: '/lessons/img/binary-search/magnifying.png',
    audioSrc: '/audio/binary-search/definition.mp3',
  },
  {
    desc: `Binary Search begins by comparing the target element with the middle element of the array. 
    If the target is smaller, the algorithm searches the left half of the array; if larger, it searches the right half. 
    This halving process continues until the target element is found or the search space is exhausted.`,
    imageSrc: '/lessons/img/binary-search/binary-visual.gif',
    audioSrc: '/audio/binary-search/works.mp3',
  },
  {
    desc: `The method is efficient for large datasets with a time complexity of O(log n) and reduces the search space by half with each comparison, 
    but it requires the list to be sorted beforehand, which introduces overhead if the list isn't already sorted, 
    and it isn't suitable for linked lists due to their lack of random access.`,
    imageSrc: '/lessons/img/binary-search/robot.jpeg',
    audioSrc: '/audio/binary-search/advantage.mp3',
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
  }, [slide, index]);

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
              <SwiperSlide className="-z-10 relative h-full w-full"
              key={index}
              >
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
