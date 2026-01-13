import Cookies from "js-cookie";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const cookieOptions = { expires: 1, secure: true, sameSite: "strict" };

const setCookie = async (user) => {
  const token = await user.getIdToken();
  Cookies.set("authToken", token, cookieOptions);
  return token;
};

export const createUser = async (email, password, displayName) => {
  if (!displayName) {
    return { errorCode: 400, errorMessage: "A name is required" };
  }

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;

    const token = await setCookie(user);
    console.log(token);
    console.log(user);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      token,
    };
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.error("Error creating user:", errorCode, errorMessage);
    return { errorCode, errorMessage };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    const token = await setCookie(user);
    console.log(token);
    console.log(user);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      token,
    };
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.error("Error signing in:", errorCode, errorMessage);
    return { errorCode, errorMessage };
  }
};

export const globalSignOut = async () => {
  try {
    await signOut(auth);
    Cookies.remove("authToken");
    return { success: true };
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.error("Error signing out:", errorCode, errorMessage);
    return { errorCode, errorMessage };
  }
};
