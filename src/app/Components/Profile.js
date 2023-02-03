import React from "react";
import { useDispatch } from "react-redux";
import { goToBillingPortal } from "../lib/stripe";
import { updateSubs } from "../redux/slices/authSlice";
import { subsLocally } from "../utils/fetchUser";
import { auth } from "../utils/firebase";
import Membership from "./Membership";
import Nav from "./Nav";

function Account() {
  const subscription = subsLocally();
  const dispatch = useDispatch();

  return (
    <div className="">
      <Nav />
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10 text-white">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#747474]">
              Member since{" "}
              {new Date(
                subscription?.current_period_start * 1000
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          {/* Find the current plan */}
          <div className="col-span-2 font-medium capitalize">
            {subscription?.role}
          </div>
          <p
            className="cursor-pointer text-blue-500 hover:underline md:text-right"
            onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>

        {/* Logout */}
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={() => {
              auth.signOut();
              dispatch(updateSubs(null));
            }}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;
