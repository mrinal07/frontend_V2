import React, { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  ProjectOutlined,
  BulbOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_BASE_URL2}`;

const handleFileDownload = async () => {
  try {
    const res = await axios({
      // File name is written hard coded
      // which means the we have to upload same name file on the server
      url: `${BASE_URL}api/portfolio/download/Mrinal_Resume.pdf`,
      method: 'GET',
      responseType: 'blob', // Important for handling binary data
    });

    // Create a new Blob object using the response data of the file
    const blob = new Blob([res.data], { type: res.data.type });
    // Create a link element
    const link = document.createElement('a');
    // Set the download attribute with a filename
    link.href = window.URL.createObjectURL(blob);
    link.download = "Mrinal_Resume.pdf";
    // Append to the document
    document.body.appendChild(link);
    // Start download
    link.click();
    // Cleanup
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
  }
};

const items = [
  {
    label: "Home",
    key: "Home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <a onClick={handleFileDownload}>Resume</a>
    ),
    key: "Resume",
    icon: <BookOutlined />,
  },
  {
    label: "About",
    key: "About",
    icon: <UserOutlined />,
  },
  {
    label: "Experience",
    key: "Experience",
    icon: <BulbOutlined />,
  },
  {
    label: "Projects",
    key: "Projects",
    icon: <ProjectOutlined />,
  },
  {
    label: "Contact",
    key: "Contact",
    icon: <ContactsOutlined />,
  },  
];

function Header() {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    // Smooth scrolling to the section
    const element = document.getElementById(e.key);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="menu" className="fixed-header">
      <Menu
        theme="dark"
        className="flex justify-center"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
  
}

export default Header;
