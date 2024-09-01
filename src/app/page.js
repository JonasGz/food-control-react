"use client";

import React, { useState, useEffect } from "react";
import { IoMdLock } from "react-icons/io";
import "./page.scss";
import { useRouter } from "next/navigation";
import Form from "./components/Form/Form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Loading } from "./components/Loading/Loading";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (auth.currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    router.push("/dashboard");
  } else {
    return (
      <div className="container">
        <IoMdLock className="icon-lock" size={110} />
        <Form router={router} type="login" />
      </div>
    );
  }
}
