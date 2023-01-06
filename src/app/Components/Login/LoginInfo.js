import React from "react";

function LoginInfo({ setSignIn }) {
  return (
    <div className="flex w-[90%] mx-auto sm:w-full h-[70vh] sm:h-[76vh] justify-center items-center flex-col gap-4">
      <h1 className="text-white font-bold text-[38px] md:text-[55px] sm:flex flex-col justify-center items-center leading-[40px] sm:leading-[60px] text-center">
        <span>Unlimited movies, TV</span> shows, and more.
      </h1>
      <p className="text-center text-white text-[25px]">
        Watch anywhere. Cancel anytime.
      </p>
      <p className="text-center text-white text-[20px]">
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <form className="flex flex-col sm:flex-row w-[90%] md:w-[75%] xl:w-[46%] 2xl:w-[38%] justify-center items-center gap-6 sm:gap-[1px]">
        <input
          type="email"
          className="bg-white p-3 md:p-[18px] xl:p-4 2xl:p-[22px] w-full sm:w-[62%] outline-none"
          placeholder="Email address"
        />
        <button
          onClick={() => setSignIn(true)}
          className="text-white mr-5 py-[8px] xl:py-[6px] 2xl:py-[12px] px-[20px] sm:w-[35%] xl:w-[32%] md:px-[10px] xl:px-0 bg-[#e50914] border-none text-[22px] md:text-[30px]"
        >
          Get Started
        </button>
      </form>
    </div>
  );
}

export default LoginInfo;
