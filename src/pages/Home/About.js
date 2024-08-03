import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about[0];
  return (
    <div id="About" className="mt-20">
      <SectionTitle title="About"></SectionTitle>

      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[50vh] w-[70%] sm:w-full">
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>

        <div className="flex flex-col gap-5 sm:w-full">
          <p className="text-white text-lg">{description1 || ""}</p>
          <p className="text-white text-lg">{description2 || ""}</p>
        </div>
      </div>

      <div className="py-5 mt-10">
        <h1 className="text-tertiary text-xl ">
          Here are a few technologies I have extensive hands-on experience with.
        </h1>

        <div className="flex  flex-wrap gap-10 mt-5">
          {skills.map((skill, index) => (
            <div className="border border-tertiary py-3 px-10 rounded-md sm:px-8 ">
              <h1 className="text-white">{skill}</h1>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default About;
