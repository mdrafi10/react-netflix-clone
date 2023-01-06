import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { auth } from "../utils/firebase";
import Nav from "./Nav";
import PlansScreen from "./PlansScreen";

function Profile() {
  const user = useSelector(selectUser);

  return (
    <div>
      <Nav />
      <div className="text-white w-full h-screen flex justify-center pt-36">
        <div className="max-w-[760px] w-[700px]">
          <h1 className="text-5xl font-medium border-b border-gray-800 mb-6 pb-4">
            Edit Profile
          </h1>
          <div className="flex gap-6 items-start flex-col sm:flex-row">
            <img
              src="images/avatar.png"
              alt="avatar"
              className="w-[100px] object-contain"
            />
            <div className="sm:flex-1 w-full sm:w-auto">
              <h3 className="text-sm font-bold text-white bg-gray-500 py-2 px-4">
                {user.email}
              </h3>
              {/* Subscribe plans*/}
              <PlansScreen />
              {/* Sign Out Button */}
              <button
                onClick={() => auth.signOut()}
                className="text-white mr-5 py-[8px] rounded px-5 bg-[#e50914] font-semibold border-none w-full"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
