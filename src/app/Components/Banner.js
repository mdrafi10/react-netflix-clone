import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import requests from "../Request/request";
import movieTrailer from "movie-trailer";
import { truncate } from "../utils/helpers";

import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateSingleMovie } from "../redux/slices/authSlice";

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const dispatch = useDispatch();
  // const [genres, setGenres] = useState([]);

  // face the single banner movie
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTreading);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // face trailer youtube url exm: v=fdf342TfdiY
  useEffect(() => {
    if (!movie) return;
    // face trailer youtube url by Movie api
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${
          movie?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      // if (data?.genres) {
      //   setGenres(data.genres);
      // }
    }

    fetchMovie();

    // search youtube url by the move name
    movieTrailer(movie?.name || "")
      .then((url) => {
        // https://www.youtube.com/watch?v=XtMThy8QKqU
        const urlParams = new URLSearchParams(new URL(url).search);
        const urlP = urlParams.get("v");
        setTrailerUrl(urlP);
      })
      .catch((error) => console.log(error));
  }, [movie]);

  const finalTrailer = trailer || trailerUrl;

  const handleClick = () => {
    dispatch(updateSingleMovie({ movie }));
    finalTrailer
      ? navigate({ pathname: "/tuber", search: `id=${finalTrailer}` })
      : navigate("/player");
  };

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
          <h1 className="text-[40px] sm:text-[55px] font-extrabold pb-[20px]">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="flex gap-3">
            <button
              className="bannerButton bg-white text-black"
              onClick={handleClick}
            >
              <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
              Play
            </button>
            <button className="bannerButton bg-[gray]/70">
              <AiOutlineInfoCircle className="h-5 w-5 md:h-8 md:w-8" />
              More Info
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
