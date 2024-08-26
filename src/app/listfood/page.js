"use client";

import React, { useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import "./page.scss";

export default function ListFoodPage() {
  const [storage, setStorage] = useState(null);
  const [value, setValue] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionStorageAuth = sessionStorage.getItem("user");
      if (!sessionStorageAuth) {
        router.push("/");
      }
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageLocal = JSON.parse(localStorage.getItem("food"));
      if (storageLocal) {
        setStorage(storageLocal);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("food");
      const obj = JSON.parse(storage);
      const values = obj.map((item) => parseInt(item.value));
      const totalValues = values.reduce(
        (acc, valorAtual) => acc + valorAtual,
        0
      );
      setValue(totalValues);
    }
  }, [storage]);

  function removeFood({ id }) {
    const newStorage = storage.filter((food) => food.id !== id);
    setStorage(newStorage);
    localStorage.setItem("food", JSON.stringify(newStorage));
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
