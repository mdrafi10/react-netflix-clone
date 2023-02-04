import React from "react";
import { useSelector } from "react-redux";
import useList from "../hooks/useList";
import { selectUser } from "../redux/slices/authSlice";
import { fetchUser } from "../utils/fetchUser";
import Nav from "./Nav";
import Row from "./Row";

function MyList() {
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;

  const list = useList(user?.uid);
  return (
    <>
      <Nav />
      <div className="pt-28"></div>
      <Row title="My List" myListMovie={list} isList />
    </>
  );
}

export default MyList;
