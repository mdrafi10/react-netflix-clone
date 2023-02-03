import React from "react";
import { AppForm, FormInput, FormBtn } from "../shared/Form";
import * as Yup from "yup";
import { auth } from "../../utils/firebase";
import firebase from "firebase/app";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const HandleLoginSignup = (values) => {
    if (isLogin) login(values.email, values.password);
    else signUp(values.email, values.password);
  };

  const loginWIthGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((userCredential) => {
      // addUserToDatabase(userCredential.user);
      console.log(userCredential.user);
    });
  };

  const signUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // addUserToDatabase(userCredential.user);
        console.log(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  };

  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
      console.log(error);
    });
  };

  // const addUserToDatabase = async (user) => {
  //   const { uid, displayName, email, photoURL } = user;
  //   const userRef = await db.collection("users").doc(uid).get();
  //   if (!userRef.exists) {
  //   db.collection("users").doc(uid).set({
  //     uid,
  //     name: displayName,
  //     email,
  //     image: photoURL,
  //   });
  //   }
  // };

  return (
    <div className="p-5">
      <div className="mx-auto max-w-[480px] rounded-md bg-loginBg my-10 p-[40px] md:p-[70px]">
        <h1 className="text-4xl font-semibold text-white mb-3">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        <div className="py-5">
          <AppForm
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={HandleLoginSignup}
            validationSchema={validationSchema}
          >
            <FormInput name="email" placeholder="Email" type="email" />
            <FormInput name="password" placeholder="Password" type="password" />
            <FormBtn title={isLogin ? "Sign In" : "Sign up"} />
          </AppForm>
          <div>
            <p className="text-center mt-5 text-gray-300">Or</p>
            <p className="mt-5 text-gray-400 text-center">
              {isLogin ? "Sign In with" : "Sign up with"}
              <span
                onClick={loginWIthGoogle}
                className="text-blue-500 font-semibold cursor-pointer hover:underline ml-1"
              >
                Google
              </span>
            </p>

            <p className="mt-5 text-gray-400 text-lg text-center">
              {isLogin ? "New to Netflix?" : "Already have an account?"}
              <span
                onClick={() => setIsLogin((o) => !o)}
                className="text-white font-medium cursor-pointer ml-1 hover:underline"
              >
                {isLogin ? "Sign up now." : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
