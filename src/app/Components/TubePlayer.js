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
import { useSelector } from "react-redux";
import { selectSingleMovie, selectUser } from "../redux/slices/authSlice";
import { fetchUser } from "../utils/fetchUser";
import { addRemoveList } from "../utils/helpers";
import useAddListed from "../hooks/useAddListed";
import { Toaster } from "react-hot-toast";

function TubePlayer() {
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trailer = searchParams.get("id");
  const allData = useSelector(selectSingleMovie);
  const localUser = fetchUser();
  const user = useSelector(selectUser) || localUser;
  const addToList = useAddListed(user, allData?.movie?.id);

  const addHandleList = () => {
    addRemoveList(addToList, user.uid, allData.movie);
  };
  return (
    <>
      <Toaster position="bottom-center" />
      <div className="relative w-full h-screen">
        <div className="back absolute pl-[1rem] pt-[4rem] z-50">
          <BsArrowLeft
            onClick={() => navigate(-1)}
            size={30}
            className="cursor-pointer text-white"
          />
        </div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
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
            <button
              className="modalButton"
              title={addToList ? "Remove from List" : "Add to my list"}
              onClick={addHandleList}
            >
              {addToList ? (
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
    </>
  );
}

export default TubePlayer;
