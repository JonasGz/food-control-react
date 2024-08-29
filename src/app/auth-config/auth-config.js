"use client";
import { initializeApp } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React from "react";
import transitionAction from "../utils/TransitionAction";

const AuthContext = React.createContext();
const auth = getAuth();

export function AuthProvider({ children }) {
  function signIn(email, password, router) {
    transitionAction("start");
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        sessionStorage.setItem("user", true);
        router.push("/dashboard");
        transitionAction("end");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function signUp(email, password, router) {
    transitionAction("start");
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sessionStorage.setItem("user", true);
        router.push("/dashboard");
        transitionAction("end");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logOut(router) {
    transitionAction("start");
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/");
        transitionAction("end");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, logOut, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
