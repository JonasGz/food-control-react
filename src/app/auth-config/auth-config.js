"use client";
import { initializeApp } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = getAuth();
  function signIn(email, password, router) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        sessionStorage.setItem("user", true);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function signUp(email, password, router) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sessionStorage.setItem("user", true);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logOut(router) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/");
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
