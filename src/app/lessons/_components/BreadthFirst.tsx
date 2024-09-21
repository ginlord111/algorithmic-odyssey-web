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
  interface Edge {
    from: number;
    to: number;
    visited: boolean;
  }
  const positions: Position[] = [
    { x: 300, y: 50 },  // Node 1
    { x: 225, y: 150 }, // Node 2
    { x: 300, y: 150 }, // Node 3
    { x: 380, y: 150 }, // Node 4
    { x: 200, y: 250 }, // Node 5
    { x: 270, y: 250 }, // Node 6
    { x: 335, y: 250 }, // Node 7
    { x: 420, y: 250 }, // Node 8
    { x: 180, y: 350 }, // Node 9
    { x: 250, y: 350 }  // Node 10
  ];
  
  const adjacencyList: number[][] = [
    [1, 2, 3],    // Node 1 connections 
    [4],          // Node 2 connections
    [5, 6],       // Node 3 connections
    [7],          // Node 4 connections
    [8],          // Node 5 connections
    [9],          // Node 6 connections
    [],           // Node 7 connections
    [],           // Node 8 connections
    [],           // Node 9 connections
    []            // Node 10 connections
  ];
const VisualComponent = () => {
    const [graph, setGraph] = useState<Edge[]>([]);
    const [nodeStates, setNodeStates] = useState<string[]>(Array(positions.length).fill('default')); // 'default', 'start', 'visited'
    const [edgeStates, setEdgeStates] = useState<string[][]>(Array(positions.length).fill([])); // Array of arrays to track visited edges
    const [logMessage, setLogMessage] = useState<string>('');
    const [startNodeInput, setStartNodeInput] = useState<string>('');
  
    useEffect(() => {
      initializeGraph();
    }, []);
  

    const initializeGraph = () => {
      const initialEdges: Edge[] = [];
      adjacencyList.forEach((neighbors, from) => {
        neighbors.forEach((to) => {
          if (from < to) {
            initialEdges.push({ from, to, visited: false });
          }
        });
      });
      setGraph(initialEdges);
    };
  

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  

    const log = (message: string) => {
      setLogMessage(prev => prev + message + '\n');
    };
  

    const highlightNode = (node: number, state: 'start' | 'visited') => {
      setNodeStates(prevStates => {
        const newStates = [...prevStates];
        if (state === 'start') {
          newStates[node] = 'start';
        } else if (state === 'visited') {
          newStates[node] = 'visited';
        }
        return newStates;
      });
    };
  
    // Function to highlight an edge
    const highlightEdge = (from: number, to: number) => {
      setGraph(prevGraph => {
        return prevGraph.map(edge => {
          if (
            (edge.from === from && edge.to === to) ||
            (edge.from === to && edge.to === from)
          ) {
            return { ...edge, visited: true };
          }
          return edge;
        });
      });
    };
  
    // BFS Algorithm
    const bfs = async (start: number) => {
      const queue: number[] = [start];
      const visited: boolean[] = Array(positions.length).fill(false);
      visited[start] = true;
      highlightNode(start, 'start');
      log(`Starting BFS from node ${start + 1}\n`);
  
      while (queue.length > 0) {
        const current = queue.shift()!;
        log(`Visiting node ${current + 1}\n`);
        highlightNode(current, 'visited');
        await sleep(1000); // Pause for visualization
  
        adjacencyList[current].forEach(neighbor => {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
            highlightEdge(current, neighbor);
            log(`Traversing edge from node ${current + 1} to node ${neighbor + 1}\n`);
          }
        });
  
        await sleep(1000); // Pause for visualization
      }
  
      log('BFS traversal completed.\n');
    };
  
    // Function to handle BFS button click
    const handleBFS = () => {
      const startNodeNumber = parseInt(startNodeInput, 10);
      if (!isNaN(startNodeNumber) && startNodeNumber >= 1 && startNodeNumber <= positions.length) {
        // Reset previous states
        setNodeStates(Array(positions.length).fill('default'));
        setGraph(graph.map(edge => ({ ...edge, visited: false })));
        setLogMessage('');
        // Start BFS
        bfs(startNodeNumber - 1);
      } else {
        log('Invalid start node. Please enter a number between 1 and 10.\n');
      }
    };
  
    // Function to render edges as SVG lines
    const renderEdges = () => {
      return graph.map((edge, index) => {
        const fromPos = positions[edge.from];
        const toPos = positions[edge.to];
        return (
          <line
            key={index}
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            className={`stroke-black stroke-2 ${edge.visited ? 'stroke-orange-500' : ''}`}
          />
        );
      });
    };
  
    const renderNodes = () => {
      return positions.map((pos, index) => {
        let nodeClass = 'bg-[lightblue]';
        if (nodeStates[index] === 'start') {
          nodeClass = 'bg-green-500';
        } else if (nodeStates[index] === 'visited') {
          nodeClass = 'bg-orange-500';
        }
  
        return (
          <div
            key={index}
            className={`node ${nodeClass} rounded-full flex items-center justify-center  text-black font-bold absolute`}
            style={{ left: `${pos.x - 20}px`, top: `${pos.y - 20}px`, width: '40px', height: '40px' }}
          >
            {index + 1}
          </div>
        );
      });
    };
  
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center">
          {/* Graph Visualization */}
          <div
            id="graph"
            className="relative bg-white border border-gray-300 w-[600px] h-[400px]"
          >
     
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {renderEdges()}
            </svg>
          
            {renderNodes()}
          </div>
  
          {/* Log Messages */}
          <div id="log" className="md:mt-4 mt-2 md:w-96 md:h-40 w-[200px] h-[100px] overflow-auto bg-gray-100 p-2 border border-gray-300 rounded">
            <pre>{logMessage}</pre>
          </div>
  
  
  
          <div className="controls md:mt-6 flex flex-col md:flex-row items-center  md:space-x-4 ">
       
            <input
              type="number"
              id="startNode"
              className="border px-4 py-2 rounded-md w-48 "
              placeholder="Start node (1-10)"
              min={1}
              max={10}
              value={startNodeInput}
              onChange={(e) => setStartNodeInput(e.target.value)}
            />
  

            <button
              id="bfsButton"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleBFS}
            >
              Start BFS
            </button>
          </div>
        </div>
      </div>
    );
  };
  
 

  
  


const contents = [
  {
    desc: "Breadth First Search Algorithm",
    className: "font-bold lg:text-6xl text-xl",
  },
  {
    desc: `Breadth First Search (BFS) is a fundamental graph traversal algorithm that begins at a source node and explores all adjacent vertices level by level. 
    It is used in various graph-related problems, such as finding the shortest path in an unweighted graph.`,
    imageSrc: '/lessons/img/bfs/bfs-intro.png',
    audioSrc: '/audio/breadth-first-search/definition.mp3',
  },
  {
    desc: `BFS starts from a given source node and explores all of its neighboring nodes. Once all neighboring nodes are visited, 
    BFS moves to the next level and explores the neighbors of those nodes. This process continues level by level using a queue data structure to keep track of nodes to visit. 
    BFS is also used for finding the shortest path in unweighted graphs and can detect cycles.`,
    imageSrc: '/lessons/img/bfs/bfs-visual.gif',
    audioSrc: '/audio/breadth-first-search/works.mp3',
  },
  {
    desc: `The method finds the shortest path in unweighted graphs and is good for exploring graphs level by level, with a simple implementation; however, 
    it requires more memory than Depth-First Search (DFS) due to the use of a queue, can be slower for very large graphs with many nodes, 
    and is less efficient for deeper or infinite graphs.`,
    imageSrc: '/lessons/img/bfs/bfs-memory.png',
    audioSrc: '/audio/breadth-first-search/advantage.mp3',
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
          <div className="flex justify-end mx-10 relative">
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
