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
    const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
    const [pivotIndex, setPivotIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [isSorting, setIsSorting] = useState<boolean>(false);
  
    const createBar = (height: number, value: number, index: number) => {
      let barClass = 'bg-[lightblue]'; // Default bar color
  
      if (highlightIndexes.includes(index)) {
        barClass = 'bg-orange-500'; // Bars being compared
      }
      if (index === pivotIndex) {
        barClass = 'bg-red-500'; // Highlight pivot
      }
  
      return (
        <div
          className={`flex items-end justify-center border-blue-600 border-2 relative ${barClass}`}
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
      return new Promise(resolve => setTimeout(resolve, ms));
    };
  
    const partition = async (array: number[], low: number, high: number) => {
      const pivot = array[high];
      let i = low - 1;
  
      setPivotIndex(high);
      setResult(`Pivot selected: ${pivot}`);
      await sleep(1000);
  
      for (let j = low; j < high; j++) {
        setHighlightIndexes([j]);
        await sleep(800);
        setResult(`Comparing ${array[j]} with pivot ${pivot}`);
  
        if (array[j] < pivot) {
          i++;
          [array[i], array[j]] = [array[j], array[i]];
          setHighlightIndexes([i, j]);
          setResult(`Swapping ${array[i]} and ${array[j]}`);
          await sleep(1000);
          setArray([...array]); // Trigger re-render
        }
      }
  
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      setHighlightIndexes([i + 1, high]);
      setResult(`Swapping pivot ${array[high]} with ${array[i + 1]}`);
      await sleep(1000);
      setArray([...array]); // Trigger re-render
  
      return i + 1;
    };
  
    const quickSort = async (array: number[], low: number, high: number) => {
      if (low < high) {
        const pi = await partition(array, low, high);
        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
      }
      if (low === 0 && high === array.length - 1) {
        setResult(`Sorted array = [${array.join(', ')}]`);
      }
    };
 
  
    const reset = () => {
      setArray(randomizeArray(7));
      setResult('');
      setHighlightIndexes([]);
      setPivotIndex(null);
    };
  
    const setArrayFromInput = () => {
      const numbers = inputValue
        .split(',')
        .map(num => parseInt(num.trim(), 10))
        .filter(num => !isNaN(num));
      if (numbers.length > 0) {
        setArray(numbers);
        setResult('');
        setHighlightIndexes([]);
        setPivotIndex(null);
      }
    };
  
    return (
      <div className="container max-w-full justify-center py-10">
        <div id="array" className="flex justify-center items-end" style={{ height: '300px' }}>
          {updateBars()}
        </div>
        <p id="result" className="mt-4 text-center">{result}</p>
        <div className="controls flex md:flex-row flex-col items-center justify-center mt-4 space-x-2">
          <button
            onClick={reset}
            className="border md:px-1 md:py-1 mr-2 border-black z-40"
            disabled={isSorting}
          >
            Randomize Array
          </button>
          <button
            onClick={async () => {
              setIsSorting(true);
              await quickSort([...array], 0, array.length - 1);
              setIsSorting(false);
            }}
            className="border md:px-1 md:py-1 border-black z-40"
            disabled={isSorting}
          >
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
          <button
            onClick={setArrayFromInput}
            className="border md:px-1 md:py-1 border-black z-40"
            disabled={isSorting}
          >
            Set Array
          </button>
        </div>
        </div>
   
      </div>
    );
  };

  
  


const contents = [
  {
    desc: "Quick Sort Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Quick Sort is a popular and efficient sorting algorithm used to organize a list of items. 
    It’s known for its ability to handle large lists quickly by using a divide-and-conquer strategy. 
    The main goal of Quick Sort is to sort a list by dividing it into smaller sections, sorting those sections, and then combining them. 
    This algorithm is widely used because of its effectiveness in managing and sorting data efficiently.`,
    imageSrc: '/lessons/img/quick-sort/quick-sort-intro.png',
    audioSrc: '/audio/quick-sort/intro.mp3',
  },
  {
    desc: `Quick Sort operates by selecting an item from the list called a pivot. 
    The list is then rearranged so that all items smaller than the pivot are placed before it, and all items larger are placed after it. 
    Once the pivot is correctly positioned, Quick Sort is applied recursively to the smaller sections on either side of the pivot. 
    This process continues until each section is sorted, resulting in a fully ordered list.`,
    imageSrc: '/lessons/img/quick-sort/quicksort-visual.gif',
    audioSrc: '/audio/quick-sort/works.mp3',
  },
  {
    desc: `Quick Sort is very fast and efficient for sorting large lists and uses minimal extra memory. 
    However, it can become slow if the pivot is poorly chosen, and it doesn’t maintain the original order of items with equal values.`,
    imageSrc: '/lessons/img/quick-sort/rabbit.png',
    audioSrc: '/audio/quick-sort/benefits.mp3',
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
