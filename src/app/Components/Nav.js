import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicMenu from "./BasicMenu";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const nav = () => {
    window.scrollY > 100 ? handleShow(true) : handleShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", nav);
    return () => window.removeEventListener("scroll", nav);
  }, []);
  return (
    <>
      <div
        className={`fixed top-0 w-full p-5 z-[1] duration-500 ease-in ${
          show && "bg-[#111]"
        }`}
      >
        <div className="flex justify-between">
          {/* Left */}
          <div className="flex items-center space-x-2 md:space-x-10">
            <img
              src="images/netflix-logo1.png"
              alt="netflix logo"
              className="w-[100px] object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />

            <BasicMenu />

            <ul className="hidden space-x-4 md:flex">
              <li
                className="headerLink cursor-default font-semibold text-white hover:text-white"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li className="headerLink">TV Shows</li>
              <li className="headerLink">Movies</li>
              <li className="headerLink">New & Popular</li>
              <li className="headerLink" onClick={() => navigate("/list")}>
                My List
              </li>
            </ul>
          </div>

          {/* right */}
          <div className="flex items-center space-x-4 text-sm font-light text-white">
            <SearchIcon className="sm hidden h-6 w-6 sm:inline" />
            <p className="hidden lg:inline">Kids</p>
            <BellIcon className="h-6 w-6" />
            <img
              src="images/avatar.png"
              title="Profile"
              alt="profile"
              className=" w-[40px] object-contain cursor-pointer rounded"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
