import React from "react";
import { useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

function TubePlayer() {
  const [searchParams] = useSearchParams();
  const trailerUrl = searchParams.get("id");

  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${trailerUrl}`}
      width="100%"
      height="100%"
      style={{ position: "absolute", top: "0", left: "0" }}
      playing
      muted={true}
    />
  );
}

export default TubePlayer;
