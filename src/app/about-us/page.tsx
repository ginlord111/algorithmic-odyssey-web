import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-[#003459] w-full md:h-[45vh] h-[40vh] relative flex items-center justify-center">
      <div className="font-bold lg:text-[50px] text-2xl text-white">About US</div>
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <div>
      <Header />
      <MaxWidthWrapper className="relative">
        <div className="flex justify-center relative">
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-full md:w-auto">
            <Image
              src="/about-us-team.jpg"
              alt="Team Picture"
              width={700}
              height={400}
              className="rounded-md"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:pt-[400px] pt-[200px] mt-10 flex justify-center">
          <p className="max-w-2xl text-justify leading-relaxed tracking-wide space-y-4 text-gray-700">
            We are a dedicated team of six individuals, united by a shared passion
            for technology and innovation. As we worked together on our capstone
            project, we honed our skills, pushed boundaries, and collaborated closely
            to achieve our goals.
            <br />
            <br />
            Our team consists of{" "}
            <span className="font-bold text-black">
              Ronnie Nicandro, Chris Jay Santos, Carl Anne Reyes, Lorenzo Manansala,
              Bryan Montanez.
            </span>{" "}
            Together, we bring a diverse set of skills to the table, including
            software development, project management, and problem-solving, all built
            on a strong foundation of teamwork.
            <br />
            <br />
            Each of us played a crucial role in the success of this project, and our
            collaboration has not only strengthened our technical expertise but also
            deepened our ability to work effectively as a cohesive unit.
            <br />
            <br />
            This project represents the culmination of our academic journey, and we
            are proud to present it as our thesis/capstone project. It is a
            reflection of our hard work, determination, and commitment to creating
            something meaningful. We hope that it serves as a testament to our
            passion for learning and our drive to contribute to the field of
            technology.
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default AboutUsPage;
