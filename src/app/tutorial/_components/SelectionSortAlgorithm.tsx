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
const randomizeArray = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100) + 10);
  };
const VisualComponent = () => {
    const [array, setArray] = useState<number[]>(randomizeArray(7));
    const [result, setResult] = useState<string>('');
    const [isSorting, setIsSorting] = useState(false);
    const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
    const [minIndex, setMinIndex] = useState<number | null>(null);
    const [swapIndexes, setSwapIndexes] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
  
    const createBar = (height: number, value: number, index: number) => {
      let barClass = 'bg-blue-300'; // Default bar color
  
      if (swapIndexes.includes(index)) {
        barClass = 'bg-green-500'; // Bars being swapped
      } else if (highlightIndexes.includes(index)) {
        barClass = 'bg-orange-400'; // Bar being compared
      } else if (index === minIndex) {
        barClass = 'bg-red-500'; // Current minimum bar
      }
  
      return (
        <div
          className={`bar flex items-end justify-center border-blue-600 border-2 relative transition-all duration-500 ease-in-out ${barClass}`}
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
  
    const selectionSort = async (array: number[]) => {
      setIsSorting(true);
      const n = array.length;
  
      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        setHighlightIndexes([i]);
        setMinIndex(minIndex);
        setResult(`Selecting ${array[i]} as the current minimum.`);
        setArray([...array]);
        await sleep(1000);
  
        for (let j = i + 1; j < n; j++) {
          setHighlightIndexes([i, j]);
          setResult(`Comparing ${array[j]} with current minimum ${array[minIndex]}.`);
          setArray([...array]);
          await sleep(1000);
  
          if (array[j] < array[minIndex]) {
            minIndex = j;
            setMinIndex(minIndex);
            setResult(`New minimum found: ${array[minIndex]}.`);
            setArray([...array]);
            await sleep(1000);
          }
        }
  
        if (minIndex !== i) {
          [array[i], array[minIndex]] = [array[minIndex], array[i]];
          setSwapIndexes([i, minIndex]);
          setResult(`Swapping ${array[i]} with ${array[minIndex]}.`);
          setArray([...array]);
          await sleep(1000);
          setSwapIndexes([]);
        }
      }
      setResult(`Sorted array = [${array.join(', ')}]`);
      setHighlightIndexes([]);
      setMinIndex(null);
      setIsSorting(false);
    };
  

  
    const reset = () => {
      setArray(randomizeArray(7));
      setResult('');
      setHighlightIndexes([]);
      setMinIndex(null);
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
        setMinIndex(null);
        setSwapIndexes([]);
      }
    };
  
    return (
      <div className="container max-w-full justify-center py-10">
        <div id="array" className="flex justify-center items-end" style={{ height: '300px' }}>
          {updateBars()}
        </div>
        <p id="result" className="mt-4 text-center">{result}</p>
        <div className="controls flex md:flex-row flex-col mt-4 justify-center items-center">
          <button onClick={reset} disabled={isSorting} className="border md:px-1 md:py-1 mr-2 border-black z-40">
            Randomize Array
          </button>
          <button onClick={() => selectionSort([...array])} disabled={isSorting} className="border md:px-1 md:py-1 border-black z-40">
            Sort Array
          </button>
          <div className="controls flex md:flex-row flex-col">
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
    desc: "Selection Sort Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Selection Sort is a simple algorithm that sorts a list by repeatedly finding the smallest item in the unsorted portion and moving it to the front. 
    It starts by locating the smallest element in the unsorted section, swapping it with the first unsorted element, 
    and then adjusting the boundary of the sorted section. This continues until the entire list is sorted. While easy to implement, 
    Selection Sort can be slow for large lists because it checks many elements multiple times.`,
    imageSrc: '/lessons/img/selection-sort/selection-intro.png',
    audioSrc: '/audio/selection-sort/what is selection sort.mp3',
  },
  {
    desc: `To perform Selection Sort, start by finding the smallest element in the unsorted part of the list. Swap this smallest element with the first unsorted element. 
    Move the boundary of the sorted section to the right and repeat the process until the entire list is sorted.`,
    imageSrc: '/lessons/img/selection-sort/selection-sort-visual.gif',
    audioSrc: '/audio/selection-sort/how it work.mp3',
  },
  {
    desc: `Selection Sort is easy to implement and works well on small lists but is inefficient for larger ones due to its quadratic time complexity. 
    It's useful for educational purposes and scenarios with limited memory but is generally not suitable for performance-critical applications.`,
    imageSrc: '/lessons/img/selection-sort/selection-slow-large-list.png',
    audioSrc: '/audio/selection-sort/key point.mp3',
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
