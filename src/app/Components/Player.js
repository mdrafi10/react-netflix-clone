import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import video from "../assets/video.mp4";

export default function Player() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trailerUrl = searchParams.get("id");

  return (
    <div>
      <div className="player w-[100vw] h-screen relative">
        <div className="back absolute p-[2rem] z-10">
          <BsArrowLeft
            onClick={() => navigate(-1)}
            size={30}
            className="cursor-pointer text-white"
          />
        </div>
        <video
          className="w-full h-full object-cover"
          src={trailerUrl ? trailerUrl : video}
          autoPlay
          loop
          controls
          muted
        />
      </div>
    </div>
  );
}
