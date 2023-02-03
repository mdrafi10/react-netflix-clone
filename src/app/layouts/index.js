import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import Netflix from "./Netflix";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Profile from "../Components/Profile";
import { fetchUser, subsLocally } from "../utils/fetchUser";
import Player from "../Components/Player";
import TubePlayer from "../Components/TubePlayer";
import Plans from "../Components/Plans";
import { db } from "../utils/firebase";

function Layouts() {
  const subs = subsLocally();
  const [subscription, setSubscription] = useState(null || subs);
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  // const user = {};

  useEffect(() => {
    if (!user) return;

    db.collection("customers")
      .doc(user?.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          console.log("inner-subscription", subscription.data());
          const subsData = {
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            cancel_at_period_end: subscription.data().cancel_at_period_end,
            current_period_start:
              subscription.data().current_period_start.seconds,
          };
          setSubscription(subsData);
          localStorage.setItem("subscript", JSON.stringify(subsData));
        });
      });
  }, [user?.uid, user]);

  return (
    <div>
      <Router>
        {user ? (
          !subscription ? (
            // <Plans products={products} />
            <Plans user={user} />
          ) : (
            // <h1 className="text-white">hello</h1>
            <Routes>
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/player" exact element={<Player />} />
              <Route path="/tuber" exact element={<TubePlayer />} />
              <Route path="/" exact element={<Netflix />} />
            </Routes>
          )
        ) : (
          <LoginScreen />
        )}
      </Router>
    </div>
  );
}

export default Layouts;
