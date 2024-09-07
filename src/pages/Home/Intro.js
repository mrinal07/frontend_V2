import React, { useRef } from "react";
import { useSelector } from "react-redux";

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, title, welcomeText, description } = intro[0];

  const onclick = () => {
    const about = document.getElementById("Contact").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="Home"
      className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10"
    >
      <h1 className="text-white mt-32">
        {portfolioData.intro[0].welcomeText || ""}
      </h1>
      <h1 className="text-7xl sm:text-3xl text-white font-semibold">
        {portfolioData.intro[0].firstName || ""}{" "}
        {portfolioData.intro[0].lastName || ""}
      </h1>
      <h1 className="text-5xl sm:text-3xl text-secondary font-semibold">
        {portfolioData.intro[0].caption || ""}
      </h1>

      <p className="text-white w-2/3">
        {portfolioData.intro[0].description || ""}
      </p>

      <a >
        <button type="button" onClick={onclick} className="border-2 border-tertiary text-tertiary px-10 py-3 rounded sm:px-4 sm:py-2">
          Get Started
        </button>
      </a>
    </div>
  );
}

export default Intro;
