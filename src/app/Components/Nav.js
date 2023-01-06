import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <img
            src="images/netflix-logo1.png"
            alt="netflix logo"
            className="w-[100px] object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
          <img
            src="images/avatar.png"
            alt="profile"
            className=" w-[40px] object-contain cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
