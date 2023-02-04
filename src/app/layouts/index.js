import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { BrowserRouter as Router } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import { fetchUser } from "../utils/fetchUser";
import MainBody from "./MainBody";

function Layouts() {
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  // const user = {};

  return <Router>{user ? <MainBody /> : <LoginScreen />}</Router>;
}

export default Layouts;
