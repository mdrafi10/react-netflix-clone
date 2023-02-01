import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsArrowLeft } from "react-icons/bs";

function TubePlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trailerUrl = searchParams.get("id");

  return (
    <div className="">
      <div className="back absolute p-[2.5rem] z-50">
        <BsArrowLeft
          onClick={() => navigate(-1)}
          size={30}
          className="cursor-pointer text-white"
        />
      </div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerUrl}`}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: "0", left: "0" }}
        playing
      />
    </div>
  );
}

export default TubePlayer;
