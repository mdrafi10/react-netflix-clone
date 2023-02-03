import firebase from "firebase/app";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser, updateUser } from "../redux/slices/authSlice";
import { auth } from "../utils/firebase";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Logged in...
        const userInfo = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        dispatch(updateUser(userInfo));
        setUser(user);
        setLoading(false);
      } else {
        // Not logged in...
        dispatch(removeUser());
        localStorage.clear();
        setUser(null);
        setLoading(true);
        // router.push("/login");
      }

      setInitialLoading(false);
    });
    return unsubscribe;
  }, [auth, dispatch]);

  const loginWIthGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((userCredential) => {
      // addUserToDatabase(userCredential.user);
      console.log(userCredential.user);
    });
  };

  const signUp = async (email, password) => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // addUserToDatabase(userCredential.user);
        console.log(userCredential.user);
        // router.push("/");
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email, password) => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        // router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logout, loginWIthGoogle }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext);
}
