// Backup of Projects section

import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects() {
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <div id="Projects" className="mt-20">
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/4 sm:flex-row sm:overflow-x-scroll sm:w-full
        sm:gap-1
        ">
          {projects.map((data, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              {/* sm:w-20 */}
              <h1
                className={`text-xl px-5 
                 ${
                   selectedItemIndex === index
                     ? "text-tertiary border-tertiary border-l-4 -m-[3px] bg-[#1a7f5a3d] py-3 sm:text-base "
                     : "text-white  sm:text-base -m-[3px]"
                 }`}
              >
                {data.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-row static w-1/2 sm:w-full">          
          <div className="flex-col gap-5 ">
            <h1 className="text-secondary text-2xl ">
              {projects[selectedItemIndex].title} &nbsp;{" "}
              <a
                href={projects[selectedItemIndex].link}
                target="_blank"
                rel="noreferrer"
                className="ml-20"
              >
                <i class="ri-link text-3xl text-white"></i>
              </a>
            </h1>
            <h1 className="text-tertiary text-xl ">
              Tech Stack: {"[ "}
              {projects[selectedItemIndex].technologies}
              {" ]"}
            </h1>
            <p className="text-white py-5">
              {projects[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
