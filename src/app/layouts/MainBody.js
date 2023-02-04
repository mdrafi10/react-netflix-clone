import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { Routes, Route } from "react-router-dom";
import Profile from "../Components/Profile";
import { fetchUser, subsLocally } from "../utils/fetchUser";
import Player from "../Components/Player";
import TubePlayer from "../Components/TubePlayer";
import Plans from "../Components/Plans";
import MyList from "../Components/MyList";
import Netflix from "./Netflix";
import useSubscription from "../hooks/useSubscription";

function MainBody() {
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  const subs = subsLocally();
  const subscription = useSubscription(user) || subs;

  if (!subscription) return <Plans user={user} />;

  return (
    <div>
      {/* <Router> */}
      <Routes>
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/list" exact element={<MyList />} />
        <Route path="/player" exact element={<Player />} />
        <Route path="/tuber" exact element={<TubePlayer />} />
        <Route path="/" exact element={<Netflix />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default MainBody;
