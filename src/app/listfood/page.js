"use client";

import React, { useEffect, useState } from "react";
import "./page.scss";

export default function ListFoodPage() {
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    const storageLocal = JSON.parse(localStorage.getItem("food"));
    if (storageLocal) {
      setStorage(storageLocal);
    }
  }, []);

  function removeFood({ id }) {
    const newStorage = storage.filter((food) => food.id !== id);
    setStorage(newStorage);
    localStorage.setItem("food", JSON.stringify(newStorage));
  }

  return (
    <div className="container-listfood">
      <ul className="list-food">
        {storage
          ? storage.map((food) => (
              <li className="item-food" key={food.id}>
                <item className="food">{food.food}</item>
                <item className="value">R$ {food.value}</item>
                <button onClick={() => removeFood(food)}>Remover</button>
              </li>
            ))
          : "Carregando"}
      </ul>
    </div>
  );
}
