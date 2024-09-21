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
    const [array, setArray] = useState<number[]>(randomizeArray(7));
    const [selected, setSelected] = useState<number | null>(null);
    const [highlightIndex, setHighlightIndex] = useState<number[]>([]);
    const [result, setResult] = useState<string>('');
    const [isSorting, setIsSorting] = useState<boolean>(false);

    function randomizeArray(length: number) {
        return Array.from({ length }, () => Math.floor(Math.random() * 100) + 10);
    }

    const createBar = (height: number, value: number, isActive: boolean) => {
        return (
            <div
                className={`bar flex items-end justify-center relative mx-1 w-8 border-2 border-blue-400  ${
                    isActive ? 'bg-orange-500' : 'bg-[lightblue]'
                }`}
                style={{ height: `${height}px` }}
            >
                <span className="absolute bottom-1 text-black">{value}</span>
            </div>
        );
    };

    const updateBars = (array: number[], highlightIndexes: number[] = [], shifting = false) => {
        return array.map((value, index) => {
            const isActive = highlightIndexes.includes(index);
            return (
                <div key={index}>
                    {createBar(value, value, isActive)}
                </div>
            );
        });
    };

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const insertionSort = async (array: number[]) => {
        setIsSorting(true);
        let updatedArray = [...array];
        for (let i = 1; i < updatedArray.length; i++) {
            let key = updatedArray[i];
            let j = i - 1;
            setSelected(key);
            setHighlightIndex([i]);
            setResult(`Selected ${key} for insertion`);
            await sleep(1000);

            while (j >= 0 && updatedArray[j] > key) {
                updatedArray[j + 1] = updatedArray[j];
                setArray([...updatedArray]);
                setHighlightIndex([j, j + 1]);
                setResult(`Shifting ${updatedArray[j]} to the right`);
                await sleep(950);
                j--;
            }
            updatedArray[j + 1] = key;
            setArray([...updatedArray]);
            setHighlightIndex([j + 1]);
            setResult(`Inserted ${key} at position ${j + 1}`);
            await sleep(1000);
        }
        setIsSorting(false);
        setResult(`Sorted array = [${updatedArray.join(', ')}]`);
    };

    const reset = () => {
        setArray(randomizeArray(7));
        setResult('');
        setHighlightIndex([]);
    };

    const setArrayFromInput = (input: string) => {
        const numbers = input.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
        if (numbers.length > 0) {
            setArray(numbers);
            setHighlightIndex([]);
        }
    };

    return (
        <div className="container max-w-full justify-center py-10 relative">
            <div>
                <div id="array" className="flex justify-center items-end h-72 my-5">
                    {updateBars(array, highlightIndex)}
                </div>
                <div className="log font-mono whitespace-pre my-5 text-center" id="log">
                    {result}
                </div>
                <div className="controls flex md:flex-row flex-col justify-center items-center my-5">
                    <div className="flex">
                        <button
                            id="randomize"
                            onClick={reset}
                            className="border px-2 py-1 mr-2 border-black"
                            disabled={isSorting}
                        >
                            Randomize Array
                        </button>
                        <button
                            id="sort"
                            onClick={() => insertionSort(array)}
                            className="border px-2 py-1 border-black"
                            disabled={isSorting}
                        >
                            Sort Array
                        </button>
                    </div>
                    <div className="md:mt-0 mt-2 flex">
                        <input
                            type="text"
                            id="arrayInput"
                            className="border px-2 py-1 md:w-72 w-32 border-black"
                            placeholder="2, 5, 9, 3, 3"
                            onChange={(e) => setArrayFromInput(e.target.value)}
                            disabled={isSorting}
                        />
                        <button
                            id="setArray"
                            onClick={() => setArrayFromInput((document.getElementById('arrayInput') as HTMLInputElement).value)}
                            className="border px-2 py-1 border-black"
                            disabled={isSorting}
                        >
                            Set Array
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const contents = [
  {
    desc: "Insertion Sort Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Insertion Sort is a simple and intuitive sorting algorithm that builds the final sorted array one item at a time.
    It works similarly to how you might arrange books on a shelf, placing each book in its correct spot based on height.
    As you add new books, you shift the taller ones to the right and insert the new book in its proper position, ensuring the shelf remains neatly organized.`,
    imageSrc: '/lessons/img/insertion-algorithm/sortingBook.jpg',
    audioSrc: '/audio/insertion-sort/intro.mp3',
  },
  {
    desc: `The algorithm starts with the second element and compares it to the elements before it. 
    It shifts elements that are larger than the current element to the right, then inserts the current element into its correct position. 
    This process is repeated for each element in the array until the entire array is sorted.`,
    imageSrc: '/lessons/img/insertion-algorithm/sorting gif.gif',
    audioSrc: '/audio/insertion-sort/work.mp3',
  },
  {
    desc: `It is easy to implement and works well for small or nearly sorted datasets. 
    Although it may not be the fastest for large datasets, it is efficient for tasks where elements are added incrementally and it performs well in practice for short lists.`,
    imageSrc: '/lessons/img/insertion-algorithm/insertion-ewan.jpg',
    audioSrc: '/audio/insertion-sort/benefits.mp3',
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
