import React, { useState } from "react";
import Auth from "../Components/Login/Auth";
import LoginInfo from "../Components/Login/LoginInfo";
import { setBackgroundImage } from "../utils/helpers";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
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
          {!signIn && (
            <button
              onClick={() => setSignIn(true)}
              className="text-white mr-5 py-[8px] rounded px-5 bg-[#e50914] border-none"
            >
              Sign In
            </button>
          )}
        </div>
        {/* Middle info */}
        {!signIn ? <LoginInfo setSignIn={setSignIn} /> : <Auth />}
      </div>
    </div>
  );
}

export default LoginScreen;
