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
    const [mergeIndexes, setMergeIndexes] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
  
    const createBar = (height: number, value: number, index: number) => {
      let barClass = 'bg-[lightblue]'; // Default bar color
  
      if (highlightIndexes.includes(index)) {
        barClass = 'bg-orange-500'; // Bars being compared
      }
      if (mergeIndexes.includes(index)) {
        barClass = 'bg-green-500'; // Bars being merged
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
  
    const merge = async (array: number[], left: number, mid: number, right: number) => {
      let temp: number[] = [];
      let i = left;
      let j = mid + 1;
  
      setMergeIndexes(Array.from({ length: right - left + 1 }, (_, k) => left + k));
      setResult(`Merging sections [${left}-${mid}] and [${mid + 1}-${right}]`);
      await sleep(1300);
  
      while (i <= mid && j <= right) {
        setHighlightIndexes([i, j]); // Highlight current indexes
        if (array[i] <= array[j]) {
          temp.push(array[i++]);
        } else {
          temp.push(array[j++]);
        }
      }
  
      while (i <= mid) {
        temp.push(array[i++]);
      }
      while (j <= right) {
        temp.push(array[j++]);
      }
  
      for (let k = 0; k < temp.length; k++) {
        array[left + k] = temp[k];
        setHighlightIndexes([]); // Clear highlights
        setMergeIndexes(Array.from({ length: right - left + 1 }, (_, index) => left + index));
        setResult(`Placing ${temp[k]} into position ${left + k}`);
        await sleep(1300);
      }
  
      setHighlightIndexes([]);
      setArray([...array]); // Update the state to reflect changes in the array
    };
  
    const mergeSort = async (array: number[], left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(array, left, mid);
        await mergeSort(array, mid + 1, right);
        await merge(array, left, mid, right);
      }
   
      if (left === 0 && right === array.length - 1) {
        setResult(`Sorted array = [${array.join(', ')}]`);
      }
    };
  
    const reset = () => {
      setArray(randomizeArray(7));
      setResult('');
      setHighlightIndexes([]);
      setMergeIndexes([]);
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
        setMergeIndexes([]);
      }
    };
  
    return (
      <div className="container max-w-full justify-center py-10">
        <div id="array" className="flex justify-center items-end" style={{ height: '300px' }}>
          {updateBars()}
        </div>
        <p id="result" className="mt-4 text-center">{result}</p>
        <div className="controls flex md:flex-row flex-col mt-4 items-center justify-center md:space-x-2">
          <button onClick={reset} disabled={isSorting} className="border md:px-1 md:py-1 mr-2 border-black z-40">
            Randomize Array
          </button>
          <button onClick={() => { setIsSorting(true); mergeSort([...array], 0, array.length - 1).then(() => setIsSorting(false)); }} disabled={isSorting} className="border md:px-1 md:py-1 border-black z-40">
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
    desc: "Merge Sort Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Merge Sort is a powerful sorting algorithm that works by dividing an array into smaller parts, sorting those parts, and then merging them back together in the correct order. 
    It’s known for being efficient and effective, especially with large datasets.`,
    imageSrc: '/lessons/img/merge-sort/merge-pep.png',
    audioSrc: '/audio/merge-sort/intro.mp3',
  },
  {
    desc: `First, the algorithm splits the array into two halves until each piece is just one element. 
    Then, it sorts these small pieces and combines them by comparing elements to form a sorted array.`,
    imageSrc: '/lessons/img/merge-sort/merge-visual.gif',
    audioSrc: '/audio/merge-sort/works.mp3',
  },
  {
    desc: `Merge Sort is reliable and ensures good performance even with large or complex datasets. 
    It is particularly useful for sorting linked lists and situations where the data is too large to fit into memory.`,
    imageSrc: '/lessons/img/merge-sort/merge-data.png',
    audioSrc: '/audio/merge-sort/benefits.mp3',
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
