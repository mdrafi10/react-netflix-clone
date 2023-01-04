import React, { useEffect, useState } from "react";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const nav = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", nav);
    return () => {
      window.removeEventListener("scroll", nav);
    };
  }, []);
  return (
    <>
      <div className={`nav ${show && "nav__black"}`}>
        <img
          src="images/netflix-logo1.png"
          alt="netflix logo"
          className="nav__logo"
        />
        <img src="images/profile1.png" alt="profile" className="nav__avatar" />
      </div>
    </>
  );
};

export default Nav;
