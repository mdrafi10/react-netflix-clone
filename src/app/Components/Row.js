import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
import movieTrailer from "movie-trailer";
import HoverVideoCard from "./HoverVideoCard";
import { Toaster } from "react-hot-toast";

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow, myListMovie, isList }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isHovered, setIsHovered] = useState({});

  //A snippet of code which runs based on a specific condition/variables
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setIsHovered(movie);

    movieTrailer(movie?.name || "")
      .then((url) => {
        // https://www.youtube.com/watch?v=XtMThy8QKqU
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => {
        console.log(error);
        setTrailerUrl("");
      });
  };
  const allMovies = movies || myListMovie;
  return (
    <>
      <Toaster position="bottom-left" />
      <div className="text-[#fff] ml-[20px] text-[20px] sm:text-[24px] font-medium">
        <h2>{title}</h2>

        <div className="flex overflow-x-scroll overflow-y-hidden p-[20px] row_posters gap-[12px]">
          {/* several row__poster(s) */}
          {!isList ? (
            <>
              {allMovies?.map((movie) => {
                return (
                  <div key={movie.id}>
                    {((isLargeRow && movie.poster_path) ||
                      (!isLargeRow && movie.backdrop_path)) && (
                      <div
                        className={`${
                          isHovered.id === movie.id && "relative"
                        } h-auto w-[270px] duration-500 hover:scale-[1.3] rounded overflow-hidden`}
                      >
                        <img
                          // src={`${base_url}${
                          //   isLargeRow ? movie.poster_path : movie.backdrop_path
                          // }`}
                          src={`${base_url}${movie.backdrop_path}`}
                          // className={`object-contain w-full max-h-[110px] sm:max-h-[135px] duration-500 hover:scale-[1.08] ${
                          //   isLargeRow && "!max-h-[250px] hover:scale-[1.09]"
                          // }`}
                          className={`w-full h-full object-contain ${
                            isHovered.id !== movie.id && "!-z-50"
                          }`}
                          alt={movie.name}
                          key={movie.id}
                          onMouseEnter={() => handleClick(movie)}
                          onMouseLeave={() => handleClick({})}
                        />
                        {isHovered.id === movie.id && (
                          <HoverVideoCard
                            handleClick={handleClick}
                            movie={movie}
                            trailerUrl={trailerUrl}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {myListMovie?.map((movie) => {
                return (
                  <div key={movie.id}>
                    {((isLargeRow && movie.poster_path) ||
                      (!isLargeRow && movie.backdrop_path)) && (
                      <div
                        className={`${
                          isHovered.id === movie.id && "relative"
                        } h-auto w-[270px] duration-500 hover:scale-[1.3] rounded overflow-hidden`}
                      >
                        <img
                          // src={`${base_url}${
                          //   isLargeRow ? movie.poster_path : movie.backdrop_path
                          // }`}
                          src={`${base_url}${movie.backdrop_path}`}
                          // className={`object-contain w-full max-h-[110px] sm:max-h-[135px] duration-500 hover:scale-[1.08] ${
                          //   isLargeRow && "!max-h-[250px] hover:scale-[1.09]"
                          // }`}
                          className={`w-full h-full object-contain ${
                            isHovered.id !== movie.id && "!-z-50"
                          }`}
                          alt={movie.name}
                          key={movie.id}
                          onMouseEnter={() => handleClick(movie)}
                          onMouseLeave={() => handleClick({})}
                        />
                        {isHovered.id === movie.id && (
                          <HoverVideoCard
                            handleClick={handleClick}
                            movie={movie}
                            trailerUrl={trailerUrl}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Row;
