import React from "react";
import { useNavigate } from "react-router-dom";
import v from "../assets/v.mp4";
import { truncate } from "../utils/helpers";
import HoverYoutube from "./HoverYoutube";

import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";

function HoverVideoCard({ handleClick, movie, trailerUrl, isLiked = false }) {
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => handleClick(movie)}
      onMouseLeave={() => handleClick({})}
      className="!z-[10000] absolute top-0 left-0 w-full max-h-max rounded overflow-hidden cursor-pointer"
    >
      <div className="relative h-full">
        {trailerUrl !== "" ? (
          <div
            className="relative"
            onClick={() =>
              navigate({ pathname: "/tuber", search: `id=${trailerUrl}` })
            }
          >
            <HoverYoutube
              trailerUrl={trailerUrl}
              onClick={() =>
                navigate({ pathname: "/tuber", search: `id=${trailerUrl}` })
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
