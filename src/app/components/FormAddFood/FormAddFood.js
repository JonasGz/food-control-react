import React, { useState } from "react";
import { Button } from "../Button/Button";
import "./FormAddFood.scss";
import transitionAction from "../../utils/transitionAction/transitionAction";

export const FormAddFood = ({ router }) => {
  const [food, setFood] = useState("");
  const [value, setValue] = useState("");
  function onChange({ target }) {
    if (target.type == "text") {
      setFood(target.value);
    } else {
      setValue(target.value);
    }
  }
  function addFood(event) {
    event.preventDefault();
    const id = Math.random();
    if (food && value) {
      transitionAction("start");
      const newFood = { food, value, id };
      const existingFood = JSON.parse(localStorage.getItem("food")) || [];
      const updateFood = [...existingFood, newFood];
      localStorage.setItem("food", JSON.stringify(updateFood));
      router.push("/listfood");
      transitionAction("end");
    } else {
      console.error(error);
    }
  }

  function clearFields(event) {
    event.preventDefault();
    setFood("");
    setValue("");
  }

  return (
    <form onSubmit={addFood} className="container-form-add-food">
      <div className="container-form-add-food__inputs">
        <input
          type="text"
          value={food}
          placeholder="Pizza"
          className="container-form-add-food__input"
          onChange={onChange}
          required
        />
        <input
          type="number"
          placeholder="50.00"
          className="container-form-add-food__input"
          onChange={onChange}
          value={value}
          required
        />
      </div>
      <div className="container-form-add-food__buttons">
        <Button action={true} type="addfood" />
        <Button action={true} type="listfood" click={clearFields} />
      </div>
    </form>
  );
};
