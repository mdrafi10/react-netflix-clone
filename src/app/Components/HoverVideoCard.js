import React from "react";
import { useNavigate } from "react-router-dom";
import v from "../assets/v.mp4";
import HoverYoutube from "./HoverYoutube";

function HoverVideoCard({ handleClick, movie, trailerUrl }) {
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => handleClick(movie)}
      onMouseLeave={() => handleClick({})}
      className="!z-[10000] absolute top-0 left-0 w-full max-h-max rounded overflow-hidden cursor-pointer"
    >
      <div className="relative h-full">
        {trailerUrl !== "" ? (
          <HoverYoutube
            trailerUrl={trailerUrl}
            onClick={() =>
              navigate({ pathname: "/tuber", search: `id=${trailerUrl}` })
            }
          />
        ) : (
          <video
            src={v}
            className="w-full h-full object-contain"
            autoPlay={true}
            loop
            muted
            onClick={() => navigate({ pathname: "/player", search: `id=${v}` })}
          />
        )}

        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-between">
            <h1 className="text-white">hello </h1>
            <h1 className="text-white">hei</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverVideoCard;
