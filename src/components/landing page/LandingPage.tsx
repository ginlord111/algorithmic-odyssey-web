import React from "react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Header from "../layout/Header";

const LandingPage = () => {
  const textAbout = [
    {
      title: "Interactive Learning",
      desc: "Algorithmic Odyssey fosters active problem-solving by offering challenges, helping students build a solid foundation in algorithms through practical tasks.",
    },
    {
      title: "Gamified Approach",
      desc: "Learning algorithms has never been more exciting. Algorithmic Odyssey incorporates game-like elements that allow students to progress through levels, overcoming increasingly complex algorithmic challenges.",
    },
    {
      title: "Custom Assessments",
      desc: "Teachers can design custom assessments, providing real-time feedback to track students' progress through our classroom feature and built-in code compiler.",
    },
  ];
  const cardsInfo = [
    {
      image: "/card_pic_1.png",
      title: "Explore Tutorials",
      desc: "Dive into step-by-step tutorials that break down complex algorithms into easy-to-follow lessons.",
    },
    {
      image: "/card_pic_2.png",
      title: "Collaborative Forum",
      desc: "Engage with other students, ask questions, and collaborate on algorithm challenges in our vibrant community forum",
    },
    {
      image: "/card_pic_3.png",
      title: "Classroom Feature",
      desc: "Our classroom feature enables teachers to create personalized assessments, track student progress, and provide real-time feedback, making learning both engaging and effective",
    },
  ];
  
  return (
    <div className="relative">
      <Header className="md:h-[70vh] h-[100vh] relative flex flex-col">
        <div className=" mx-auto w-full max-w-screen-xl px-2.5 md:px-20 relative flex flex-col justify-center md:items-start items-center h-full gap-5 text-center md:text-start">
          <div className="font-bold md:text-[60px] text-[30px] max-w-3xl text-[#EBF2FA]">
            Your Journey to Mastering Algorithms!
          </div>
          <div className="text-lg font-bold tracking-wide text-[#EBF2FA] max-w-2xl">
            <p>
              Welcome to Algorithmic Odyssey! Step into a gamified world where
              learning algorithms is fun, interactive, and rewarding.
            </p>
          </div>
          <div className="w-fit mt-16 flex space-x-4">
            <Link
              href={"https://algo-thesis.onrender.com/tutorial"}
              className="bg-white p-3 px-6 rounded-md text-lg font-bold text-[#333F67]"
            >
              Learn now
            </Link>
            <Link
              href="https://algo-thesis.onrender.com"
              target="_blank"
              className="bg-[#003459] p-3 px-6 rounded-md text-lg font-bold text-[white]"
            >
              Play now
            </Link>
          </div>
        </div>
      </Header>
      <div className="relative  h-fit p-4">
        <div className="pt-20">
          <MaxWidthWrapper>
            <h1 className="font-bold md:text-5xl text-2xl tracking-wide pb-8">
              About Algorithmic Odyssey
            </h1>
            <div className="pt-10 flex gap-10 lg:flex-row  flex-col overflow-hidden">
              <div className="flex flex-col gap-5 md:w-[50%] w-full">
                <div className="relative md:w-[500px] md:h-[300px] w-full h-[200px]">
                  <Image
                    src="/about_pic_1.png"
                    alt="IMAGE"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-md leading-7">
                    Algorithmic Odyssey is an innovative platform designed to
                    make mastering algorithms engaging and interactive. Through
                    hands-on coding challenges, real-time feedback, and visual
                    aids, students can deepen their understanding of key
                    algorithms such as Bubble Sort, DFS, and Quick Sort. Our
                    mission is to enhance algorithm learning by making the
                    process accessible and enjoyable.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {textAbout.map((content, index) => (
                  <div className="flex gap-5" key={index}>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-xl">{content.title}</h3>
                      <p className="text-sm leading-7">{content.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
      {/* LANDING PAGE CARD */}
      <div className="relative mt-[150px]">
        <MaxWidthWrapper>
          <h2 className="text-4xl tracking-wide font-bold pb-16">
            OUR FEATURES
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-1  grid-cols-1 gap-10">
            {cardsInfo.map((card, index) => (
              <Card
                className="bg-transparent w-[350px] h-[480px] flex flex-col z-[1]"
                key={index}
              >
                <CardHeader className="p-0">
                  <div className="relative  w-full h-[200px]">
                    <Image
                      src={card.image}
                      alt="IMAGE"
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </CardHeader>
                <CardBody className="bg-[#003459]">
                  <div className="py-4 flex flex-col items-start gap-3">
                    <h3 className="font-bold tracking-wide text-2xl h-fit text-white">
                      {card.title}
                    </h3>
                    <p className="text-md text-white">{card.desc}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </MaxWidthWrapper>
      </div>
      {/* YOUTUBE TUTORIAL */}
      <div className="h-fit mt-[250px] pb-[150px]">
        <MaxWidthWrapper>
          <h1 className="font-bold tracking-wide md:text-5xl text-2xl mb-10">
          Learn and have fun!
          </h1>
          <div className="relative  flex-col space-y-4">
            <iframe
              src="https://www.youtube.com/embed/EC7BoilfBSk?si=FaSx4j5eQXA6zAPS"
              title="Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className=" w-full lg:h-[700px] md:[500px] sm:h-[400px] h-[300px]   cursor-pointer"
            ></iframe>
            <div className="pt-16 flex justify-center max-w-4xl items-center space-x-24">
            <Link
              href={"#"}
              className="bg-[#00A8E8] p-3 px-6 rounded-md text-lg font-bold text-white border border-[#cbd5e11a]"
            >
              Learn now
            </Link>
            <Link
              href={"https://algo-thesis.onrender.com"}
              className="bg-[#003459] p-3 px-6 rounded-md text-lg font-bold text-[white]"
            >
              Play now
            </Link>
          </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default LandingPage;
