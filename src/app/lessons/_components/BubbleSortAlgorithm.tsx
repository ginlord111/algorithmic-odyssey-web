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
    const [isSorting, setIsSorting] = useState(false);
    const [result, setResult] = useState<string>('');
    const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
    const [swapIndexes, setSwapIndexes] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
  
    const createBar = (height: number, value: number, index: number) => {
      let barClass = 'bg-[lightblue]'; // Default bar color
  
      if (highlightIndexes.includes(index)) {
        barClass = 'bg-orange-500'; // Bars being compared
      }
      if (swapIndexes.includes(index)) {
        barClass = 'bg-red-500'; // Bars being swapped
      }
  
      return (
        <div
          className={`bar flex items-end justify-center border-blue-600 border-2 relative ${barClass}`}
          style={{ height: `${height}px`, width: '30px', margin: '2px' }}
          key={index}
        >
          <span className="absolute bottom-1 text-black">{value}</span>
        </div>
      );
    };
  
    const updateBars = () => {
      return array.map((value, index) => createBar(value, value, index));
    };
  
    const sleep = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
  
    const bubbleSort = async (array: number[]) => {
      setIsSorting(true);
      let N = array.length;
      let swapped;
      do {
        swapped = false;
        for (let i = 0; i < N - 1; i++) {
          setHighlightIndexes([i, i + 1]); // Highlight bars being compared
          setSwapIndexes([]); // Clear swap highlight
          setResult(`Comparing ${array[i]} and ${array[i + 1]}`);
          setArray([...array]);
          await sleep(1000);
  
          if (array[i] > array[i + 1]) {
            setResult(`Swapping ${array[i]} and ${array[i + 1]}`);
            setSwapIndexes([i, i + 1]); // Highlight bars being swapped
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
            swapped = true;
            setArray([...array]);
            await sleep(1000);
          }
        }
        N--;
      } while (swapped);
  
      setResult(`Sorted array = [${array.join(', ')}]`);
      setHighlightIndexes([]);
      setSwapIndexes([]);
      setIsSorting(false);
    };
  
    const reset = () => {
      setArray(randomizeArray(7));
      setResult('');
      setHighlightIndexes([]);
      setSwapIndexes([]);
    };
  
    const setArrayFromInput = () => {
      const numbers = inputValue
        .split(',')
        .map((num) => parseInt(num.trim(), 10))
        .filter((num) => !isNaN(num));
      if (numbers.length > 0) {
        setArray(numbers);
        setResult('');
        setHighlightIndexes([]);
        setSwapIndexes([]);
      }
    };
  
    return (
      <div className="container max-w-full justify-center py-10">
        <div id="array" className="flex justify-center items-end" style={{ height: '300px' }}>
          {updateBars()}
        </div>
        <p id="result" className="mt-4 text-center">{result}</p>
        <div className="controls flex md:flex-row flex-col mt-4 justify-center items-center md:space-x-2">
          <button onClick={reset} disabled={isSorting} className="border md:px-1 md:py-1 mr-2 border-black z-40">
            Randomize Array
          </button>
          <button onClick={() => bubbleSort([...array])} disabled={isSorting} className="border md:px-1 md:py-1 border-black z-40">
            Sort Array
          </button>
          <div className="controls flex md:flex-row flex-col ">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="2, 5, 9, 3, 3"
            className="border md:px-1 md:py-1 md:w-72 w-36 border-black z-40"
            disabled={isSorting}
          />
          <button onClick={setArrayFromInput} disabled={isSorting} className="border md:px-1 md:py-1 border-black z-40">
            Set Array
          </button>
        </div>
        </div>
     
      </div>
    );
  };

  
  


const contents = [
  {
    desc: "Bubble Sort Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Bubble Sort is a basic sorting method that organizes elements by repeatedly stepping through the list. 
    It compares each pair of adjacent elements and swaps them if they are in the wrong order, gradually moving larger elements to the end.`,
    imageSrc: '/lessons/img/bubble-sort/bubble-sort-algorithm.png',
    audioSrc: '/audio/bubble-sort/what is bubble sort.mp3',
  },
  {
    desc: `The algorithm starts by comparing the first two elements of the list and swapping them if needed. 
    It continues this process for each pair of adjacent elements until reaching the end of the list. After each pass through the list, 
    the next largest element is in its correct position, and the process is repeated for the remaining elements.`,
    imageSrc: '/lessons/img/bubble-sort/bubble-sort.gif',
    audioSrc: '/audio/bubble-sort/how bubble sort works.mp3',
  },
  {
    desc: `Bubble Sort can be slow with large lists because it involves many steps to compare and swap elements. Even though it's easy to understand and use, 
    other sorting methods are generally faster for big lists.`,
    imageSrc: '/lessons/img/bubble-sort/slow.png',
    audioSrc: '/audio/bubble-sort/efficiency and complexity.mp3',
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
