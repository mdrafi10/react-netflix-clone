import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import requests from "../Request/request";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  // console.log(movie);
  function truncate(str, num) {
    return str?.length > num ? str.substr(0, num - 1) + "..." : str;
  }

  return (
    <>
      <header
        className="text-white object-contain height-[448px] relative"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="ml-[30px] pt-[140px]">
          <h1 className="text-[40px] sm:text-[55px] font-extrabold pb-[5px]">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button className="cursor-pointer text-white outline-none border-none font-bold px-8 mr-4 pt-2 bg-buttonBg pb-2 rounded-[0.2vw] hover:text-[#000] hover:bg-[#e6e6e6] transition-all">
              Play
            </button>
            <button className="cursor-pointer text-white outline-none border-none font-bold px-8 mr-4 pt-2 bg-buttonBg pb-2 rounded-[0.2vw] hover:text-[#000] hover:bg-[#e6e6e6] transition-all">
              My List
            </button>
          </div>
          <h1 className="w-[45rem] leading-[1.3] pt-[1rem] text-[0.8rem] max-w-[360px] h-[80px]">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner--fadeBottom h-[8rem]" />
      </header>
    </>
  );
};

export default Banner;
