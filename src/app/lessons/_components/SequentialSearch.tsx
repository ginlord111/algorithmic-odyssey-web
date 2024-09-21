"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";
import '../styles/style.css'
import { ChevronLeft, ChevronRight,Volume2,VolumeX   } from "lucide-react";
import Image from "next/image";

   const VisualComponent: React.FC = () => {
    const [array, setArray] = useState<number[]>(randomizeArray(7));
    const [target, setTarget] = useState<number | null>(null);
    const [resultText, setResultText] = useState<string>('');
    const [logText, setLogText] = useState<string>('');
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    function randomizeArray(length: number): number[] {
        return Array.from({ length }, () => Math.floor(Math.random() * 100) + 10);
    }

    function createBar(height: number, value: number, isActive: boolean, isFound: boolean) {
        return (
            <div
                className={`w-8 mx-1 flex items-end justify-center border border-blue-500 relative ${isActive ? 'bg-orange-500' : 'bg-[lightblue]'} ${isFound ? 'bg-green-500' : ''}`}
                style={{ height: `${height}px` }}
            >
                <span className="absolute bottom-1 text-black">{value}</span>
            </div>
        );
    }

    function updateBars(array: number[], highlightIndex: number | null = null, foundIndex: number | null = null) {
        return array.map((value, index) => createBar(value, value, index === highlightIndex, index === foundIndex));
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const linearSearch = async (array: number[], target: number) => {
      for (let i = 0; i < array.length; i++) {
          setHighlightIndex(i); 
          setResultText(`Checking element: ${array[i]}`);
          await sleep(1000);

          if (array[i] === target) {
              setFoundIndex(i); 
              setResultText(`Target ${target} found at index ${i}`);
              setLogText(`Found target ${target} at index ${i}`);
              return i;
          }
      }
      setResultText(`Target ${target} not found in the array`);
      return -1;
  };

    const handleRandomize = () => {
        const newArray = randomizeArray(7);
        setArray(newArray);
        setResultText('');
        setLogText('');
        setHighlightIndex(null)
        setFoundIndex(null)
    };

    const handleSetArray = () => {
        const input = (document.getElementById('arrayInput') as HTMLInputElement).value;
        const numbers = input.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
        if (numbers.length > 0) {
            setArray(numbers);
            setResultText('');
            setLogText('');
        }
    };

    const handleSearch = () => {
        const input = (document.getElementById('targetInput') as HTMLInputElement).value;
        const targetNumber = parseInt(input, 10);
        if (!isNaN(targetNumber)) {
            setTarget(targetNumber);
            linearSearch(array, targetNumber);
        }
    };

    return (
        <div id="with-code" className="py-10 relative flex flex-col">
            <div id="array" className="flex justify-center items-end h-72 mx-5">
            {updateBars(array, highlightIndex, foundIndex)}
            </div>
            <div className="log font-mono whitespace-pre text-center">{logText}</div>
            <p id="result" className="text-center">{resultText}</p>
            <div className="controls flex md:flex-row flex-col md:justify-center  my-5">
                <button id="randomize" className="border md:px-2 md:py-1 mr-2 border-black z-40" onClick={handleRandomize}>Randomize Array</button>
                <input type="number" id="targetInput" className="border md:px-2 md:py-1  border-black z-40" placeholder="Enter target number" />
                <button id="search" className="border md:px-2 md:py-1 border-black z-40" onClick={handleSearch}>Search Array</button>
                <input type="text" id="arrayInput" className="border md:px-2 md:py-1 border-black z-40" placeholder="2, 5, 9, 3, 3" />
                <button id="setArray" className="border md:px-2 md:py-1 border-black z-40" onClick={handleSetArray}>Set Array</button>
            </div>
        </div>
    );
};
const contents = [
  {
    desc: "Sequential Search",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: "Sequential Search is a straightforward algorithm used to locate an item in a list by inspecting each element in sequence until the target is found or the end of the list is reached.",
    imageSrc: "/lessons/img/linear-search/linearPep.png",
    audioSrc: "/audio/sequential-search/intro.mp3",
  },
  {
    desc: "To perform a Sequential Search, start at the beginning of the list and check each element one by one. If you find an element that matches the target, return its position. If you reach the end of the list without finding the target, indicate that the item is not present",
    imageSrc: "/lessons/img/linear-search/linear_search.gif",
    audioSrc: "/audio/sequential-search/works.mp3",
  },
  {
    desc: "Sequential Search is easy to implement and understand, making it ideal for small lists and those that frequently change. It doesn’t require sorting, adding flexibility. However, it can be slow for large lists, as it may need to check every element before finding the target or concluding it’s not there, which makes it less efficient compared to more advanced search methods.",
    imageSrc: "/lessons/img/linear-search/linear-nbg.png",
    audioSrc: "/audio/sequential-search/benefits.mp3",
  },
  {
    component:<VisualComponent />
  }
];


const SequentialSearch = () => {
  const [slide, setSlide] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
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
    if(audioRef.current && isMuted === false){
      audioRef.current.src = contents[index].audioSrc as string
      audioRef.current.play()
    }

    const handleMute = () => {
      if(audioRef.current && isMuted === false){
        setIsMuted(true)
        audioRef.current?.pause()
        audioRef.current.currentTime = 0;
      }
      else{
        setIsMuted(false)
        audioRef.current?.play()
      }
    }

  return (
    <div>
      <textarea
        id="ide"
        className="hidden z-50 md:w-96 w-80 h-96 pl-2 bg-black bottom-10 md:right-10 right-4 md:text-base text-sm text-green-400 resize-none"
        readOnly
      ></textarea>

<audio  ref={audioRef}>
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
{isMuted ? <VolumeX className="md:w-16 md:h-16 h-10 w-10"  onClick={handleMute} /> : <Volume2 className="md:w-16 md:h-16 h-10 w-10"  onClick={handleMute}/>}

</div>
       
          {contents.map((content, index) => {
         
            return (
              <SwiperSlide className="-z-10 relative h-full w-full"
              key={index}
              >
              {content.component ? (
                content.component
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full space-y-4" key={index}>
                {content.imageSrc && 
              <div className="relative md:w-[400px] md:h-[250px] w-[200px] h-[100px]">
                  <Image 
                src={content.imageSrc}
              layout="fill"
                alt="CONTENT IMAGE"
                />
              </div>
                }
              <div className={`${content.className && content.className} mx-20`}>{content.desc}</div>
            </div>
              )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
        onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
            slide?.slidePrev();
          }}
          className={cn(
            `swiper-button-prev absolute top-1/2 -translate-y-1/2 left-[5%] p-2 z-50`,
            
            "transition",
             sliderConfig.isBegin && hiddenIcon
          )}
        >
          <ChevronLeft  className="md:w-14 md:h-14 w-8 h-8 hover:text-blue-500 transition"/>
        </div>
        <div
           onClick={(e) => {
            e.stopPropagation();
            e.preventDefault()
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

export default SequentialSearch;
