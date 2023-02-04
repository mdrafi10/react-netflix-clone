import toast from "react-hot-toast";
import { db } from "./firebase";

export const setBackgroundImage = (url, style) => ({
  backgroundImage: `url(${url})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  ...style,
});

export function truncate(str, num) {
  return str?.length > num ? str.substr(0, num - 1) + "..." : str;
}

// AddList movie & remove list movie functionality

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

export const addRemoveList = async (addToList, uid, movie) => {
  if (!movie?.id) return;
  if (addToList) {
    db.collection("customers")
      .doc(uid)
      .collection("myList")
      .doc(movie?.id.toString())
      .delete()
      .then(() => {
        toast(
          `${
            movie?.title || movie?.original_name
          } has been removed from My List`,
          {
            duration: 8000,
            style: toastStyle,
          }
        );
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  } else {
    db.collection("customers")
      .doc(uid)
      .collection("myList")
      .doc(movie?.id.toString())
      .set({
        id: movie?.id,
        poster_path: movie?.poster_path,
        backdrop_path: movie?.backdrop_path,
        title: movie?.title,
        original_title: movie?.original_title,
      })
      .then(() => {
        toast(
          `${movie?.title || movie?.original_name} has been added to My List.`,
          {
            duration: 8000,
            style: toastStyle,
          }
        );
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }
};
