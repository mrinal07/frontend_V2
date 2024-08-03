import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperience from "./AdminExperience";
import { useSelector } from "react-redux";
import AdminProject from "./AdminProject";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";
import AdminResume from "./AdminResume";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div>
    <div className="bg-primary">
       <br/>
    </div>
      <div className="flex gap-10 items-center px-5 py-2 mt-5 justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl text-primary">Admin Panel</h1>
        </div>
        <div className="">
          <h1
            className="text-primary tex-xl cursor-pointer border border-gray-500 px-4 py-1"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin-login";
            }}
          >
            Logout
          </h1>
        </div>
      </div>
      {portfolioData && (
        <div className="mt-5 p-5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Intro" key="1">
              <AdminIntro />
            </TabPane>
            <TabPane tab="About" key="2">
              <AdminAbout />
            </TabPane>
            <TabPane tab="Experiences" key="3">
              <AdminExperience />
            </TabPane>
            <TabPane tab="Projects" key="4">
              <AdminProject />
            </TabPane>
            <TabPane tab="Courses" key="5">
              <AdminCourses />
            </TabPane>
            <TabPane tab="Contact" key="6">
              <AdminContact />
            </TabPane>
            <TabPane tab="Resume" key="7">
              <AdminResume />
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Admin;
