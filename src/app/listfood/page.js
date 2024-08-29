"use client";

import React, { use, useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { ProtectPage } from "../components/ProtectPage/ProtectPage";
import "./page.scss";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Loading } from "../components/Loading/Loading";

export default function ListFoodPage() {
  const [storage, setStorage] = useState(null);
  const [value, setValue] = useState(null);
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageLocal = JSON.parse(localStorage.getItem("food"));
      if (storageLocal) {
        setStorage(storageLocal);
      }
    }
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem("food");
    const obj = JSON.parse(storage);
    const values = obj.map((item) => parseInt(item.value));
    const totalValues = values.reduce((acc, valorAtual) => acc + valorAtual, 0);
    setValue(totalValues);
  }, [storage]);

  function removeFood({ id }) {
    const newStorage = storage.filter((food) => food.id !== id);
    setStorage(newStorage);
    localStorage.setItem("food", JSON.stringify(newStorage));
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <ProtectPage />;
  }

  return (
    <div className="container-listfood">
      <h1>R$ {value}</h1>
      <ul className="list-food">
        {storage
          ? storage.map((food) => (
              <li className="item-food" key={food.id}>
                <item className="food">{food.food}</item>
                <div className="value-delete">
                  <item className="value">R$ {food.value}</item>

                  <IoIosRemoveCircle
                    className="delete"
                    onClick={() => removeFood(food)}
                    size={26}
                  />
                </div>
              </li>
            ))
          : "Carregando"}
      </ul>
    </div>
  );
}
