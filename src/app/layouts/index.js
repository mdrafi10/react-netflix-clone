import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import Netflix from "./Netflix";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Profile from "../Components/Profile";
import { fetchUser } from "../utils/fetchUser";
import Player from "../Components/Player";
import TubePlayer from "../Components/TubePlayer";

function Layouts() {
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  // const user = {};

  return (
    <div>
      <Router>
        {user ? (
          <Routes>
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/player" exact element={<Player />} />
            <Route path="/tuber" exact element={<TubePlayer />} />
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
