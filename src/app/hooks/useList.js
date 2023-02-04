import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

function useList(uid) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!uid) return;
    return db
      .collection("customers")
      .doc(uid)
      .collection("myList")
      .onSnapshot((snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, [uid]);

  return list;
}

export default useList;
