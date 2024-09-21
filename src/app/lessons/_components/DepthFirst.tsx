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
interface Position {
  x: number;
  y: number;
}

// Node positions (0-based indexing)
const positions: Position[] = [
  { x: 340, y: 50 },  // Node 0
  { x: 240, y: 150 }, // Node 1
  { x: 340, y: 150 }, // Node 2
  { x: 390, y: 250 }, // Node 3
  { x: 230, y: 250 }, // Node 4
  { x: 300, y: 250 }  // Node 5
];

// Adjacency list for the graph (0-based indexing)
const adjacencyList: number[][] = [
  [1, 2],    // Node 0 connections
  [0, 4],    // Node 1 connections
  [0, 3, 5], // Node 2 connections
  [2],       // Node 3 connections
  [1],       // Node 4 connections
  [2]        // Node 5 connections
];


const VisualComponent = () => {

  const [nodeStates, setNodeStates] = useState<string[]>(Array(positions.length).fill('default')); // 'default', 'start', 'visited'
  const [edgeStates, setEdgeStates] = useState<boolean[][]>(Array.from({ length: positions.length }, () => Array(positions.length).fill(false)));
  const [logMessage, setLogMessage] = useState<string>('');
  const [startNodeInput, setStartNodeInput] = useState<string>('');
  const [isTraversing, setIsTraversing] = useState<boolean>(false);

  const initializeGraph = () => {
    setNodeStates(Array(positions.length).fill('default'));
    setEdgeStates(Array.from({ length: positions.length }, () => Array(positions.length).fill(false)));
    setLogMessage('');
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const log = (message: string) => {
    setLogMessage(prev => prev + message + '\n');
  };

  const highlightNode = (node: number, state: 'start' | 'visited') => {
    setNodeStates(prevStates => {
      const newStates = [...prevStates];
      newStates[node] = state;
      return newStates;
    });
  };

  const highlightEdge = (from: number, to: number) => {
    setEdgeStates(prevEdgeStates => {
      const newEdgeStates = prevEdgeStates.map(row => [...row]);
      newEdgeStates[from][to] = true;
      newEdgeStates[to][from] = true; 
      return newEdgeStates;
    });
  };

  // DFS Algorithm
  const dfs = async (node: number, visited: boolean[]) => {
    if (isTraversing) return; // Prevent multiple traversals
    setIsTraversing(true);
    initializeGraph();

    log(`Starting DFS traversal from node ${node + 1}\n`);
    highlightNode(node, 'start');
    await sleep(1000);

    const stack: number[] = [node];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (!visited[current]) {
        visited[current] = true;
        highlightNode(current, 'visited');
        log(`Visiting node ${current + 1}\n`);
        await sleep(1000);

        for (const neighbor of adjacencyList[current].reverse()) { 
          if (!visited[neighbor]) {
            stack.push(neighbor);
            highlightEdge(current, neighbor);
            log(`Traversing edge from node ${current + 1} to node ${neighbor + 1}\n`);
            await sleep(1000);
          }
        }
      }
    }

    log('DFS traversal completed.\n');
    setIsTraversing(false);
  };

  const handleDFS = () => {
    const startNode = parseInt(startNodeInput, 10) - 1;
    if (!isNaN(startNode) && startNode >= 0 && startNode < positions.length) {
      const visited = Array(positions.length).fill(false);
      dfs(startNode, visited);
    } else {
      log('Invalid start node. Please enter a number between 1 and 6.\n');
    }
  };

  const renderEdges = () => {
    const renderedEdges: JSX.Element[] = [];
    for (let from = 0; from < adjacencyList.length; from++) {
      for (const to of adjacencyList[from]) {
        if (from < to) { // Prevent duplicate edges
          const isVisited = edgeStates[from][to];
          renderedEdges.push(
            <line
              key={`${from}-${to}`}
              x1={positions[from].x}
              y1={positions[from].y}
              x2={positions[to].x}
              y2={positions[to].y}
              className={`line ${isVisited ? 'stroke-orange-500' : 'stroke-black'}`}
            />
          );
        }
      }
    }
    return renderedEdges;
  };

  // Render nodes as divs
  const renderNodes = () => {
    return positions.map((pos, index) => {
      let nodeColor = 'bg-[lightblue]';
      if (nodeStates[index] === 'start') {
        nodeColor = 'bg-green-500';
      } else if (nodeStates[index] === 'visited') {
        nodeColor = 'bg-orange-500';
      }

      return (
        <div
          key={index}
          className={`node ${nodeColor} rounded-full flex items-center justify-center text-black font-bold absolute`}
          style={{
            left: `${pos.x - 20}px`,
            top: `${pos.y - 20}px`,
            width: '40px',
            height: '40px'
          }}
        >
          {index + 1}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto py-10 ">
      <div className="flex flex-col items-center">
        <div
          id="graph"
          className="relative bg-white border border-gray-300 rounded-md"
          style={{ width: '600px', height: '400px' }}
        >
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {renderEdges()}
          </svg>
          {renderNodes()}
        </div>

        <div
          id="log"
          className="mt-4 w-full max-w-2xl h-20 overflow-auto bg-gray-100 p-2 border border-gray-300 rounded"
        >
          <pre>{logMessage}</pre>
        </div>

    
        <div className="controls md:mt-6 mt-2 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="number"
            id="startNode"
            className="border px-4 py-2 rounded-md w-48"
            placeholder="Start node (1-6)"
            min={1}
            max={6}
            value={startNodeInput}
            onChange={(e) => setStartNodeInput(e.target.value)}
            disabled={isTraversing}
          />

          <button
            id="dfsButton"
            className={`z-50 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${isTraversing ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDFS}
            disabled={isTraversing}
          >
            Start DFS
          </button>
        </div>
      </div>
    </div>
  );
};
  
  


const contents = [
  {
    desc: "Depth First Search Algorithm",
    className: "font-bold md:text-6xl text-xl",
  },
  {
    desc: `Depth First Search (DFS) is a graph traversal algorithm that explores as far down each branch of the graph as possible before backtracking to explore other branches. 
    It is useful for solving problems like finding connected components and detecting cycles.`,
    imageSrc: '/lessons/img/dfs/dfs-intro.png',
    audioSrc: '/audio/depth-first-search/definition.mp3',
  },
  {
    desc: `DFS starts from a source node and explores each branch of the graph as deeply as possible, 
    using a stack (or recursion) to track visited nodes. It explores all reachable vertices from the source node before backtracking to explore alternative paths. 
    DFS is particularly useful for exploring all paths in a graph or tree structure.`,
    imageSrc: '/lessons/img/dfs/dfs-visual.gif',
    audioSrc: '/audio/depth-first-search/works.mp3',
  },
  {
    desc: `The method uses less memory than Breadth-First Search (BFS), is good for exploring all possible paths in a graph, 
    and is simple to implement and works well with recursion; however, it can get stuck in deep branches, leading to inefficiency, 
    is not optimal for finding the shortest path, and may not work efficiently on very large graphs without optimization.`,
    imageSrc: '/lessons/img/dfs/dfs-last.png',
    audioSrc: '/audio/depth-first-search/advantage.mp3',
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
