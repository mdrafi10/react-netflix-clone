import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import v from "../assets/v.mp4";
import { truncate } from "../utils/helpers";
import HoverYoutube from "./HoverYoutube";

import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
// import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";

const API_KEY = "fb5d239509124514bb487d53a31dc9f7";

function HoverVideoCard({ handleClick, movie, trailerUrl, isLiked = false }) {
  const [trailer, setTrailer] = useState("");
  // const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!movie) return;

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
  }, [movie]);

  const finalTrailer = trailer || trailerUrl;

  return (
    <div
      onMouseEnter={() => handleClick(movie)}
      onMouseLeave={() => handleClick({})}
      className="!z-[10000] absolute top-0 left-0 w-full max-h-max rounded overflow-hidden cursor-pointer"
    >
      <div className="relative h-full">
        {trailerUrl !== "" || trailer !== "" ? (
          <div
            className="relative"
            onClick={() =>
              navigate({ pathname: "/tuber", search: `id=${finalTrailer}` })
            }
          >
            <HoverYoutube
              trailerUrl={finalTrailer}
              onClick={() =>
                navigate({ pathname: "/tuber", search: `id=${finalTrailer}` })
              }
            />
            {/* icon */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="flex pl-4 pb-3 gap-2">
                <IoPlayCircleSharp title="Play" />
                {isLiked ? (
                  <BsCheck title="Remove from List" />
                ) : (
                  <AiOutlinePlus title="Add to my list" />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="relative"
            onClick={() => navigate({ pathname: "/player", search: `id=${v}` })}
          >
            <video
              src={v}
              className="w-full h-full object-contain"
              autoPlay={true}
              loop
              muted
            />
            <div className="absolute top-0 left-0 w-full">
              <h1 className="text-white text-sm pl-4 pt-2">
                {truncate(
                  movie?.title || movie?.name || movie?.original_name,
                  30
                )}
              </h1>
            </div>
            {/* icon */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="flex pl-4 pb-3 gap-2">
                <IoPlayCircleSharp title="Play" />
                {isLiked ? (
                  <BsCheck title="Remove from List" />
                ) : (
                  <AiOutlinePlus title="Add to my list" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HoverVideoCard;
