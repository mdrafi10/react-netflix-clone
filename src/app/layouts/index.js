import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import Auth from "./Auth";
import Netflix from "./Netflix";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";

function Layouts() {
  // const user = useSelector(selectUser);
  const user = null;

  return (
    <div>
      <Router>
        {user ? (
          <Routes>
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
