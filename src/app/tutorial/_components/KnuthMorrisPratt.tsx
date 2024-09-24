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
    const [text, setText] = useState<string>('');
    const [pattern, setPattern] = useState<string>('');
    const [textArray, setTextArray] = useState<string[]>([]);
    const [patternArray, setPatternArray] = useState<string[]>([]);
    const [log, setLog] = useState<string>('');
    const [buildComparisons, setBuildComparisons] = useState<number>(0);
    const [searchComparisons, setSearchComparisons] = useState<number>(0);
    const [activeIndices, setActiveIndices] = useState<{ text: number; pattern: number } | null>(null);

    const createCharElement = (char: string, index: number, isPattern: boolean) => (
        <div key={index} className={`char border border-black w-8 h-8 flex items-center justify-center font-mono text-lg ${activeIndices?.text === index ? 'bg-green-200' : activeIndices?.text === -1 ? 'bg-red-200' : 'bg-white'}`}>
            {char}
        </div>
    );

    const updateDisplay = () => {
        setTextArray(text.split(''));
        setPatternArray(pattern.split(''));
        setLog('');
        setActiveIndices(null);
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const computeLPSArray = async (patternArr: string[]) => {
        const lps = new Array(patternArr.length).fill(0);
        let length = 0;
        let i = 1;
        setBuildComparisons(0);

        setLog(prev => prev + "Building LPS array:\n");

        while (i < patternArr.length) {
            setBuildComparisons(prev => prev + 1);
            if (patternArr[i] === patternArr[length]) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }

            setLog(prev => prev + `LPS: ${lps.join(' ')}\n`);
            await sleep(900);
        }

        return lps;
    };

    const KMPSearch = async () => {
        const lps = await computeLPSArray(patternArray);
        let i = 0, j = 0;
        setSearchComparisons(0);
        setLog(prev => prev + "\nStarting KMP search...\n");

        while (i < textArray.length) {
            setSearchComparisons(prev => prev + 1);
            setActiveIndices({ text: i, pattern: j });

            await sleep(900);

            if (patternArray[j] === textArray[i]) {
                i++;
                j++;
            }

            if (j === pattern.length) {
                setLog(prev => `${prev}\nPattern found at index: ${i - j}\n`);
                j = lps[j - 1];
            } else if (i < textArray.length && patternArray[j] !== textArray[i]) {
                setLog(prev => `${prev}Mismatch at index ${i}\n`);
                setActiveIndices({ text: -1, pattern: j });
                await sleep(900);

                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }

            setActiveIndices(null);
        }
    };

    const handleSearch = () => {
        if (text && pattern) {
            updateDisplay();
            KMPSearch();
        } else {
            setLog('Please enter both text and pattern.');
        }
    };

    const reset = () => {
        setText('');
        setPattern('');
        setTextArray([]);
        setPatternArray([]);
        setLog('');
        setBuildComparisons(0);
        setSearchComparisons(0);
        setActiveIndices(null);
    };

    return (
        <div className="container mx-auto p-10">
            <div id="controls" className="flex flex-col md:flex-row justify-center mb-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border px-2 py-1 w-28 border-black md:mr-2"
                    placeholder="Text:"
                />
                <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="border px-2 py-1 w-28 border-black md:mr-2"
                    placeholder="Pattern:"
                />
                <button onClick={handleSearch} className="border px-2 py-1 border-black md:mr-2 mt-2 md:mt-0">Search</button>
                <button onClick={reset} className="border px-2 py-1 border-black mt-2 md:mt-0">Reset</button>
            </div>

            <div className="comparison mb-4">
                <p>Build comparisons: {buildComparisons}</p>
                <p>Search comparisons: {searchComparisons}</p>
            </div>

            <div id="text" className="flex justify-center mb-2">
                {textArray.map((char, index) => createCharElement(char, index, false))}
            </div>
            <div id="pattern" className="flex justify-center mb-2">
                {patternArray.map((char, index) => createCharElement(char, index, true))}
            </div>

            <div id="log" className="max-w-md">
                <pre>{log}</pre>
            </div>
        </div>
    );
}

const contents = [
  {
    desc: "The Knuth-Morris-Pratt (KMP)",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `The Knuth-Morris-Pratt (KMP) algorithm, named after its inventors Donald Knuth, Vaughan Pratt, and James H. Morris, 
    is an efficient string-matching algorithm that searches for occurrences of a "pattern" string within a "text" string. 
    It improves upon the brute-force method by avoiding redundant comparisons after mismatches.`,
    imageSrc: "/lessons/img/knuth-morris-pratt/donald knuth.png",
    audioSrc: "/audio/knuth-morris-pratt/definition.mp3",
  },
  {
    desc: `KMP preprocesses the pattern string to create a partial match table (or prefix table), which helps avoid redundant comparisons. 
    When a mismatch occurs, the algorithm uses this table to shift the pattern efficiently without rechecking previously matched characters, 
    continuing until all occurrences are found.`,
    imageSrc: "/lessons/img/knuth-morris-pratt/knuth-how.gif",
    audioSrc: "/audio/knuth-morris-pratt/works.mp3",
  },
  {
    desc: `The method avoids unnecessary comparisons, making it efficient for searching long texts with small patterns. 
    However, it requires complex preprocessing and is more difficult to implement than brute-force string search, 
    and is only suitable for string search problems.`,
    imageSrc: "/lessons/img/knuth-morris-pratt/longtext-nbg.png",
    audioSrc: "/audio/knuth-morris-pratt/advantage.mp3",
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
