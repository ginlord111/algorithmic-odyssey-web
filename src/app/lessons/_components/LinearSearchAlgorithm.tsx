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
const randomizeArray = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100) + 10);
  };
const VisualComponent = () => {
    const [array, setArray] = useState<number[]>(randomizeArray(7));
    const [result, setResult] = useState<string>('');
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [targetInput, setTargetInput] = useState<string>('');
    const [arrayInput, setArrayInput] = useState<string>('');
  
    // Function to randomize the array
    function randomizeArray(length: number): number[] {
      return Array.from({ length }, () => Math.floor(Math.random() * 90) + 10);
    }
  
    // Function to create a bar element
    const createBar = (value: number, index: number) => {
      let barColor = 'bg-blue-400'; // Default color
  
      if (index === highlightIndex) {
        barColor = 'bg-orange-500'; // Currently being checked
      }
  
      if (index === foundIndex) {
        barColor = 'bg-green-500'; // Found target
      }
  
      return (
        <div
          key={index}
          className={`flex items-end justify-center border-2 border-blue-600 relative ${barColor}`}
          style={{ height: `${value}px`, width: '30px', margin: '2px' }}
        >
          <span className="absolute bottom-1 text-black">{value}</span>
        </div>
      );
    };
  
    // Function to update bars based on the array
    const updateBars = () => {
      return array.map((value, index) => createBar(value, index));
    };
  
    // Sleep function to create delays
    const sleep = (ms: number) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
  
    // Linear search algorithm with visualization
    const linearSearch = async (arr: number[], target: number) => {
      setIsSearching(true);
      setResult('');
      setFoundIndex(null);
  
      for (let i = 0; i < arr.length; i++) {
        setHighlightIndex(i);
        setResult(`Checking element: ${arr[i]}`);
        await sleep(1000); // Delay for visualization
  
        if (arr[i] === target) {
          setResult(`Target ${target} found at index ${i}`);
          setFoundIndex(i);
          setHighlightIndex(null);
          setIsSearching(false);
          return;
        }
      }
  
      setResult(`Target ${target} not found in the array`);
      setHighlightIndex(null);
      setIsSearching(false);
    };
  
    // Function to set array from input
    const setArrayFromInput = () => {
      const numbers = arrayInput
        .split(',')
        .map(num => parseInt(num.trim(), 10))
        .filter(num => !isNaN(num));
      if (numbers.length > 0) {
        setArray(numbers);
        setResult('');
        setHighlightIndex(null);
        setFoundIndex(null);
      }
    };
  
    // Function to reset the array
    const reset = () => {
      setArray(randomizeArray(7));
      setResult('');
      setHighlightIndex(null);
      setFoundIndex(null);
    };
  
    return (
      <div className="container mx-auto py-10">
        {/* Array Visualization */}
        <div
          id="array"
          className="flex justify-center items-end h-80 border border-gray-300 p-4"
        >
          {updateBars()}
        </div>
  
        {/* Result Display */}
        <p id="result" className="mt-4 text-center text-lg font-semibold">
          {result}
        </p>
  
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-6 space-x-2 md:space-y-0 md:space-x-4">
          {/* Randomize Array Button */}
          <button
            onClick={reset}
            className="px-4 py-2 border border-black rounded hover:bg-gray-200 disabled:opacity-50"
            disabled={isSearching}
          >
            Randomize Array
          </button>
  
          {/* Set Array from Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={arrayInput}
              onChange={e => setArrayInput(e.target.value)}
              placeholder="2, 5, 9, 3, 3"
              className="px-2 py-1 border border-black rounded w-48"
              disabled={isSearching}
            />
            <button
              onClick={setArrayFromInput}
              className="px-4 py-2 border border-black rounded hover:bg-gray-200 disabled:opacity-50"
              disabled={isSearching}
            >
              Set Array
            </button>
          </div>
  
          {/* Search Target */}
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={targetInput}
              onChange={e => setTargetInput(e.target.value)}
              placeholder="Enter target number"
              className="px-2 py-1 border border-black rounded w-48"
              disabled={isSearching}
            />
            <button
              onClick={() => {
                const target = parseInt(targetInput, 10);
                if (!isNaN(target)) {
                  linearSearch(array, target);
                }
              }}
              className="px-4 py-2 border border-black rounded hover:bg-gray-200 disabled:opacity-50"
              disabled={isSearching || targetInput.trim() === ''}
            >
              Search Array
            </button>
          </div>
        </div>
      </div>
    );
  };


  
  


const contents = [
  {
    desc: "Linear Search Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Linear Search is a sequential search algorithm that starts at one end of a list and goes through each element until the desired element is found,
     or the search continues till the end of the dataset. It is versatile and can be used on both sorted and unsorted data.`,
    imageSrc: '/lessons/img/linear-search/linearPep.png',
    audioSrc: '/audio/linear-search/definition.mp3',
  },
  {
    desc: `The algorithm starts by comparing the target element with the first element of the list. 
    If a match is found, the search stops. If not, the algorithm continues to the next element and repeats this process until the target is found or the end of the list is reached.`,
    imageSrc: '/lessons/img/linear-search/linear_search.gif',
    audioSrc: '/audio/linear-search/works.mp3',
  },
  {
    desc: `The method is easy to set up and works with both sorted and unsorted data without needing extra memory or preparation. 
    However, it checks every element one by one, making it slow and inefficient for large datasets, and not ideal for applications that need fast performance.`,
    imageSrc: '/lessons/img/linear-search/linear-nbg.png',
    audioSrc: '/audio/linear-search/advantage.mp3',
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
