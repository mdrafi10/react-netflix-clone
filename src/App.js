import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layouts from "./app/layouts";
import { removeUser, updateUser } from "./app/redux/slices/authSlice";
import { auth } from "./app/utils/firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // firebase user listeners
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        dispatch(updateUser(userInfo));
        // db.collection("users")
        //   .doc(user.uid)
        //   .get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       dispatch(updateUser(doc.data()));
        //     }
        //   });
      } else {
        dispatch(removeUser());
        localStorage.clear();
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="bg-[#141414]">
      <Layouts />
    </div>
  );
}

export default App;
