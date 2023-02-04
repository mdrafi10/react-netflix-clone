import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

function useAddListed(user, movieId) {
  const [addToList, setAddToList] = useState(false);
  const [movies, setMovies] = useState([]);

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return db
        .collection("customers")
        .doc(user.uid)
        .collection("myList")
        .onSnapshot((snapshot) => setMovies(snapshot.docs));
    }
  }, [movieId, user]);

  // Check if the movie is already in the user's list
  useEffect(
    () =>
      setAddToList(
        movies.findIndex((result) => result.data().id === movieId) !== -1
      ),
    [movies, movieId]
  );

  return addToList;
}

export default useAddListed;
