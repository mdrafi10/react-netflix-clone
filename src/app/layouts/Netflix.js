import React from "react";
import { useSelector } from "react-redux";
import Banner from "../Components/Banner";
import Nav from "../Components/Nav";
import Row from "../Components/Row";
import useList from "../hooks/useList";
import { selectUser } from "../redux/slices/authSlice";
import requests from "../Request/request";
import { fetchUser } from "../utils/fetchUser";

function Netflix() {
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;

  const list = useList(user?.uid);

  return (
    <>
      <Nav />
      <Banner />
      {/* <Row
        title="NETFLIX ORGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      /> */}
      <Row title="Treading Now" fetchUrl={requests.fetchTreading} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="My List" myListMovie={list} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
}

export default Netflix;
