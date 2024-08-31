"use client";
import React, { useEffect, useState } from "react";
import { GiHamburger } from "react-icons/gi";
import "./page.scss";
import { useRouter } from "next/navigation";
import { ProtectPage } from "../components/ProtectPage/ProtectPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Loading } from "../components/Loading/Loading";
import { FormAddFood } from "../components/FormAddFood/FormAddFood";

export default function AddFoodPage() {
  const auth = getAuth();
  const router = useRouter();
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

  if (!user) {
    return <ProtectPage />;
  }

  return (
    <div className="container-addfood">
      <GiHamburger size={110} />
      <FormAddFood router={router} />
    </div>
  );
}
