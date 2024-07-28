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

const items = [
  {
    label: "Home",
    key: "Home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <a href="./Mrinal_Resume.pdf" download="Mrinal_Resume.pdf">
        Resume
      </a>
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
  //   {
  //     label: "Navigation Two",
  //     key: "app",
  //     icon: <AppstoreOutlined />,
  //     disabled: true,
  //   },
  //   {
  //     label: "Navigation Three - Submenu",
  //     key: "SubMenu",
  //     icon: <SettingOutlined />,
  //     children: [
  //       {
  //         type: "group",
  //         label: "Item 1",
  //         children: [
  //           {
  //             label: "Option 1",
  //             key: "setting:1",
  //           },
  //           {
  //             label: "Option 2",
  //             key: "setting:2",
  //           },
  //         ],
  //       },
  //       {
  //         type: "group",
  //         label: "Item 2",
  //         children: [
  //           {
  //             label: "Option 3",
  //             key: "setting:3",
  //           },
  //           {
  //             label: "Option 4",
  //             key: "setting:4",
  //           },
  //         ],
  //       },
  //     ],
  //   },
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
  // return (
  //     <div>

  //     </div>
  //     // <div className="p-5 bg-primary flex justify-between">
  //     //     <h1 className="text-secondary text-4xl font-semibold">M</h1>
  //     //     <h1 className="text-white text-4xl font-semibold">N</h1>
  //     //     <h1 className="text-tertiary text-4xl font-semibold">C</h1>

  //     // </div>
  // )
}

export default Header;
