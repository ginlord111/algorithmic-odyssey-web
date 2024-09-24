import React from "react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "../layout/MaxWidthWrapper";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Header from "../layout/Header";


const LandingPage = () => {
  const imageAbout = [
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ];
  const cardsInfo = [
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
      image: "https://placehold.co/600x400",
      title: "TITLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
  ];
  return (
    <div className="relative">
      <Header className="md:h-[70vh] h-[100vh] relative flex flex-col">
        <div className=" mx-auto w-full max-w-screen-xl px-2.5 md:px-20 relative flex flex-col justify-center md:items-start items-center h-full gap-5 text-center md:text-start">
          <div className="font-bold md:text-[60px] text-[30px] max-w-2xl text-[#FFFFF5DB]">
            Unlock Algorithm Skills with Every Level
          </div>
          <div className="text-lg font-bold tracking-wide text-[#FFFFF5DB] max-w-2xl">
            <p>
              Embark on a 2D Gaming Journey to Master Algorithms and Boost Your
              Problem-Solving Abilities
            </p>
          </div>
          <div className="w-fit mt-16">
            <Link
              href={"#"}
              className="bg-white p-3 px-6 rounded-md text-lg font-bold text-[#333F67]"
            >
              Download Here
            </Link>
          </div>
        </div>
      </Header>
      <div className="relative  h-fit p-4">
        <div className="pt-20">
          <MaxWidthWrapper>
            <h1 className="font-bold md:text-5xl text-2xl tracking-wide">
              About
            </h1>
            <div className="pt-10 flex gap-10 lg:flex-row md:flex-col overflow-hidden">
              <div className="flex flex-col gap-5 md:w-[50%] w-full">
                <div className="relative md:w-[500px] md:h-[300px] w-full h-[200px]">
                  <Image
                    src="https://placehold.co/600x400"
                    alt="IMAGE"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="font-bold text-xl tracking-wide">TITLE</h1>
                  <p className="text-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                {imageAbout.map((content, index) => (
                  <div className="flex gap-5" key={index}>
                    <div className="relative md:w-[150px] w-full h-[100px]">
                      <Image
                        src={content.image}
                        alt="IMAGE"
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-xl">{content.title}</h3>
                      <p className="text-sm">{content.desc}</p>
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
          <h2 className="text-4xl tracking-wide font-bold pb-16">TITLE</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
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
                    <p className="text-md text-gray-400">{card.desc}</p>
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
            Tutorial
          </h1>
          <div className="relative ">
            <iframe
              src="https://www.youtube.com/embed/EC7BoilfBSk?si=FaSx4j5eQXA6zAPS"
              title="Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="md:w-[1060px] md:h-[700px] w-full h-[300px] cursor-pointer"
            ></iframe>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default LandingPage;
