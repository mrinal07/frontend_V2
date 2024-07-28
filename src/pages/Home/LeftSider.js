import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-[-20px] bottom-0 px-10  sm:static ">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row ">
          <a
            href="https://www.linkedin.com/in/mrinal-choudhary/"
            target="_blank" rel="noreferrer"
          >
            <i class="ri-linkedin-box-fill text-3xl text-white "></i>
          </a>

          <a href="https://github.com/mrinal07" target="_blank" rel="noreferrer">
            <i class="ri-github-line text-3xl text-white hover:"></i>
          </a>

          <a href="mailto:Mrinal7331@gmail.com" target="_blank" rel="noreferrer">
          <i class="ri-mail-line text-3xl text-white "></i>

          </a>

          <a href="https://www.instagram.com/_anonymous.07/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noreferrer">

          <i class="ri-instagram-fill text-3xl text-white "></i>
          </a>

        </div>

        <div className="w-[1px] h-40 bg-[#125f63] mt-2 sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
