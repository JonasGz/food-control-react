"use client";
import { initializeApp } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
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

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
