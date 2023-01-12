import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import Netflix from "./Netflix";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Profile from "../Components/Profile";
import { fetchUser } from "../utils/fetchUser";

function Layouts() {
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  // const user = null;

  return (
    <div>
      <Router>
        {user ? (
          <Routes>
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/" exact element={<Netflix />} />
          </Routes>
        ) : (
          <LoginScreen />
        )}
      </Router>
    </div>
  );
}

export default Layouts;
