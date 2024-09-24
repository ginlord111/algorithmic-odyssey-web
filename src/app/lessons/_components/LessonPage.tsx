import Image from "next/image";

const LessonPage = () => {
  const algoCards = [
    {
      title: "What is algorithm",
      description:
        "An algorithm is a step-by-step process to solve a problem or complete a task efficiently.",
      href: "/lessons/algorithm",
    },
    {
      title: "Euclid Algorithm",
      description:
        "The Euclidean Algorithm finds the GCD of two numbers by repeatedly dividing and taking remainders until the remainder is zero.",
      href: "/lessons/euclid-algorithm",
    },
    {
      title: "Knuth Morris Pratt",
      description:
        "The KMP algorithm finds patterns in text efficiently by using a preprocessed table to skip redundant comparisons.",
      href: "/lessons/knuth-morris-pratt",
    },
  ];
  const sortingAlgoCards = [
    {
        href: '/lessons/insertion-sort',
        title: 'Insertion Sort',
        description: 'Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time by repeatedly inserting each element into its correct position.',
      },
      {
        href: '/lessons/selection-sort',
        title: 'Selection Sort',
        description: 'Selection Sort is a sorting algorithm that repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the end of the sorted portion.',
      },
      {
        href: '/lessons/bubble-sort',
        title: 'Bubble Sort',
        description: 'Bubble Sort repeatedly swaps adjacent elements if they are in the wrong order until the list is sorted.',
      },
      {
        href:'/lessons/merge-sort',
        title:'Merging Sort',
        description:'Merge Sort is a divide-and-conquer algorithm that splits the list into halves, sorts each half, and then merges the sorted halves back together.'
      },{
        href:'/lessons/quick-sort',
        title:'Quick Sort',
        description:'Quick Sort is a divide-and-conquer algorithm that selects a "pivot" element, partitions the list into elements less than and greater than the pivot, and recursively sorts the partitions.'
      }
  ]

  const searchingAlgoCards = [
    {
        href: '/lessons/linear-search',
        title: 'Linear Search',
        description: 'Linear Search checks each element in a list sequentially until the target element is found or the end of the list is reached.',
      },
      {
        href: '/lessons/binary-search',
        title: 'Binary Search',
        description: 'Binary Search efficiently finds an element in a sorted list by repeatedly dividing the search interval in half.',
      },
      {
        href: '/lessons/breadth-first',
        title: 'Breadth First Search',
        description: 'Breadth-First Search explores a graph or tree level by level, starting from the root or initial node and visiting all neighbors before moving to the next level.',
      },
      {
        href: '/lessons/depth-first',
        title: 'Depth First Search',
        description: 'Depth-First Search (DFS) explores a graph or tree by diving as deep as possible into each branch before backtracking.',
      },
      {
        href: '/lessons/sequential-search',
        title: 'Sequential Search',
        description: 'Sequential Search checks each element in a list one by one until it finds the target or reaches the end.',
      },
  ]
  return (
    <div>

      <section
        style={{
          backgroundImage: "url('/static/img/index/index-bg.jpg')",
          backgroundSize: "cover",
        }}
        className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
      >
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Exploring Algorithms
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Explore the fundamentals of 12 essential algorithm types with clear
            visualizations.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="/lessons/algorithm"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="container max-w-full flex flex-wrap flex-col mt-3">
        <div className="container max-w-full flex justify-center text-2xl mt-5 mb-5">
          <h1 className="font-bold">Algorithms</h1>
        </div>

        <div className="container max-w-full flex flex-wrap justify-center">
          {algoCards.map((algorithm, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mr-5 mt-3"
            >
              <div className="p-5">
                <a href={algorithm.href}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {algorithm.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {algorithm.description}
                </p>
                <a
                  href={algorithm.href}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read now
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          <div>
      <div className="container max-w-full flex justify-center text-2xl mt-16">
        <h1 className="font-bold">Sorting Algorithms</h1>
      </div>

      <div className="md:container md:max-w-full flex md:justify-center mt-5 md:flex-row flex-wrap justify-center">
        {sortingAlgoCards.map((algorithm, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mr-5 mt-3">
            <div className="p-5">
              <a href={algorithm.href}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{algorithm.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{algorithm.description}</p>
              <a href={algorithm.href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read now
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <div className="container max-w-full flex justify-center text-2xl mt-16">
        <h1 className="font-bold">Search Algorithms</h1>
      </div>

      <div className="md:container md:max-w-full flex md:justify-center mt-5 md:flex-row flex-wrap justify-center">
        {searchingAlgoCards.map((algorithm, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mr-5 mt-3">
            <div className="p-5">
              <a href={algorithm.href}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{algorithm.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{algorithm.description}</p>
              <a href={algorithm.href} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read now
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>

        {/* More sections and cards can be added here similarly */}
      </div>
    </div>
  );
};

export default LessonPage;
