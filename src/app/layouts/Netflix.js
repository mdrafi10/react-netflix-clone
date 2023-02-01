import React from "react";
import Banner from "../Components/Banner";
import Nav from "../Components/Nav";
import Row from "../Components/Row";
import requests from "../Request/request";

function Netflix() {
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
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
}

export default Netflix;
