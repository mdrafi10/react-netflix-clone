import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //A snippet of code which runs based on a specific condition/varaible
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="text-[#fff] ml-[20px] text-[20px] sm:text-[24px] font-medium">
        <h2>{title}</h2>

        <div className="flex overflow-y-hidden overflow-x-scroll p-[20px] row_posters gap-[12px]">
          {/* several row__poster(s) */}
          {movies.map((movie) => {
            return (
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  className={`object-contain w-full max-h-[110px] sm:max-h-[135px] duration-500 hover:scale-[1.08] ${
                    isLargeRow && "!max-h-[250px] hover:scale-[1.09]"
                  }`}
                  alt={movie.name}
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                />
              )
            );
          })}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
};

export default Row;
