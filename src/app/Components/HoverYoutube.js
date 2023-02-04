import React from "react";
import ReactPlayer from "react-player/youtube";

function HoverYoutube({ trailerUrl, onClick }) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${trailerUrl}`}
      width="100%"
      height="100%"
      playing
      muted={false}
      onPause={onClick}
    />
  );
}

export default HoverYoutube;
