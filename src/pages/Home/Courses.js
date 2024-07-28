import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Courses() {
  const {  portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  const {  title, link, description,image } = courses;

  // static data
  // const Courses = [
  //   {
  //     title: "Project 1",
  //     image:"",
  //     link: "/",
  //     description: "", 
  //   },
  //   {
  //     title: "Project 2",
  //     image:"",
  //     link: "/",
  //     description: "",
  //   },
  //   {
  //     title: "Project 3",
  //     image:"",
  //     link: "/",
  //     description: "",
  //   },
  // ];

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <div className="mt-20">
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-10 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((data, index) => (
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

        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img src={courses[selectedItemIndex].image} alt="Sample Img" className="h-60 w-72"></img>
 
          

          <div className="flex-col gap-5 ">
            <h1 className="text-secondary text-2xl ">
              {courses[selectedItemIndex].title}
            </h1>
            
            <p className="text-white py-5">
            {courses[selectedItemIndex].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
