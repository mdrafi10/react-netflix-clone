import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import v from "../assets/v.mp4";
import { addRemoveList, truncate } from "../utils/helpers";
import HoverYoutube from "./HoverYoutube";

import { IoPlayCircleSharp } from "react-icons/io5";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { fetchUser } from "../utils/fetchUser";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateSingleMovie } from "../redux/slices/authSlice";
import useAddListed from "../hooks/useAddListed";

const API_KEY = "fb5d239509124514bb487d53a31dc9f7";

function HoverVideoCard({ handleClick, movie, trailerUrl }) {
  const [trailer, setTrailer] = useState("");
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToList = useAddListed(user, movie?.id); // it's return true and false

  // get the movie trailer from the user the api
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

  // videoCard Click function
  const videoCardClick = () => {
    const dataPassQuery = {
      movie,
      addToList,
      finalTrailer,
      video: v,
    };

    dispatch(updateSingleMovie(dataPassQuery));
    navigate({ pathname: "/tuber", search: `id=${finalTrailer}` });
  };

  const finalTrailer = trailer || trailerUrl;

  return (
    <div
      onMouseEnter={() => handleClick(movie)}
      onMouseLeave={() => handleClick({})}
      className="!z-[10000] absolute top-0 left-0 w-full max-h-max rounded overflow-hidden cursor-pointer"
    >
      <div className="relative h-full">
        {trailerUrl !== "" || trailer !== "" ? (
          <div className="relative">
            <HoverYoutube trailerUrl={finalTrailer} onClick={videoCardClick} />
            {/* icon */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="flex pl-4 pb-3 gap-2">
                <IoPlayCircleSharp title="Play" onClick={videoCardClick} />
                <button
                  className="modalButton-video"
                  title={addToList ? "Remove from List" : "Add to my list"}
                  onClick={() => addRemoveList(addToList, user.uid, movie)}
                >
                  {addToList ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : (
                    <PlusIcon className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <video
              src={v}
              className="w-full h-full object-contain"
              onClick={() =>
                navigate({ pathname: "/player", search: `id=${v}` })
              }
              autoPlay={true}
              loop
              muted
            />
            <div className="absolute top-0 left-0 w-full">
              <h1
                className="text-white text-sm pl-4 pt-2"
                onClick={() =>
                  navigate({
                    pathname: "/player",
                    search: `id=${v}`,
                  })
                }
              >
                {truncate(
                  movie?.title || movie?.name || movie?.original_name,
                  30
                )}
              </h1>
            </div>
            {/* icon */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="flex pl-4 pb-3 gap-2 items-center">
                <IoPlayCircleSharp title="Play" />
                <button
                  className="modalButton-video"
                  title={addToList ? "Remove from List" : "Add to my list"}
                  onClick={() => addRemoveList(addToList, user.uid, movie)}
                >
                  {addToList ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : (
                    <PlusIcon className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HoverVideoCard;
