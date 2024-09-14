import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./About";
import Experience from "./Experiences";
import Projects from "./Projects";
import Courses from "./Courses";
import Contact from "./Contact";
import Footer from "./Footer";
import LeftSider from "./LeftSider";
import { useSelector } from "react-redux";
import Services from "./Services";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      {portfolioData && (
        <div>
          <Header></Header>
          <div className="bg-primary px-40 sm:px-5">
            <Intro></Intro>
            <About></About>
            <Services />
            <Experience />
            <Projects />
            {/* <Courses /> */}
            <Contact />
            <Footer />
            <LeftSider />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
