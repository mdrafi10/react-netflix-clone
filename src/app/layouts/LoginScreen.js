import React from "react";
import { setBackgroundImage } from "../utils/helpers";

function LoginScreen() {
  return (
    <div
      className="relative h-screen z-0"
      style={setBackgroundImage(
        "https://assets.nflxext.com/ffe/siteui/vlv3/84526d58-475e-4e6f-9c81-d2d78ddce803/e2232ec0-d1eb-4095-af7e-f8eacee3682b/BD-en-20221228-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full z-[1] bg-linearBg linearG" />
      <div className="relative z-20">
        {/* Header */}
        <div className=" flex items-center justify-between w-full">
          <img
            className="w-[180px] object-contain pl-[20px] cursor-pointer"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          <button
            onClick={() => null}
            className="text-white mr-5 py-[10px] px-5 bg-[#e50914] border-none"
          >
            Sign In
          </button>
        </div>
        {/* Middle info */}
        <div className="flex w-[90%] mx-auto sm:w-full h-[70vh] sm:h-[80vh] justify-center items-center flex-col gap-4">
          <h1 className="text-white font-bold text-[38px] md:text-[55px] sm:flex flex-col justify-center items-center leading-[40px] sm:leading-[60px] text-center">
            <span>Unlimited movies, TV</span> shows, and more.
          </h1>
          <p className="text-center text-white text-[25px]">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-center text-white text-[20px]">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="flex flex-col sm:flex-row w-[90%] md:w-[75%] xl:w-[46%] 2xl:w-[38%] justify-center items-center gap-6 sm:gap-[1px]">
            <input
              type="email"
              className="bg-white p-3 md:p-[18px] xl:p-4 2xl:p-[22px] w-full sm:w-[62%] outline-none"
              placeholder="Email address"
            />
            <button className="text-white mr-5 py-[8px] xl:py-[6px] 2xl:py-[12px] px-[20px] sm:w-[35%] xl:w-[32%] md:px-[10px] xl:px-0 bg-[#e50914] border-none text-[22px] md:text-[30px]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
