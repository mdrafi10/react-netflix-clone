import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsArrowLeft } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";

function TubePlayer() {
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trailerUrl = searchParams.get("id");

  return (
    <div className="relative w-full h-screen">
      <div className="back absolute pl-[1rem] pt-[4rem] z-50">
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
        pip={true}
        config={{
          youtube: {
            playerVars: {
              // controls: 0,
              modestbranding: 1,
              showinfo: 0,
              fs: 0,
              autohide: 2,
              disablekb: 0,
              frameborder: 0,
            },
          },
        }}
      />
      {/* Youtube Player Button */}
      <div className="absolute bottom-20 flex w-full items-center justify-between px-10">
        <div className="flex space-x-2">
          <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
            <FaPlay className="h-7 w-7 text-black" />
            Play
          </button>
          <button className="modalButton">
            {false ? (
              <CheckIcon className="h-7 w-7" />
            ) : (
              <PlusIcon className="h-7 w-7" />
            )}
          </button>
          <button className="modalButton">
            <ThumbUpIcon className="h-6 w-6" />
          </button>
        </div>
        <button className="modalButton" onClick={() => setMuted(!muted)}>
          {muted ? (
            <VolumeOffIcon className="h-6 w-6" />
          ) : (
            <VolumeUpIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default TubePlayer;
