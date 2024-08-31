import React, { act, Fragment } from "react";
import { IoMdAdd } from "react-icons/io";
import { BsList } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import "./Button.scss";
import { Transition } from "../Transition/Transition";

export const Button = ({ action, page, router, type, click }) => {
  function pushRouter() {
    if (page == "add") {
      router.push("/addfood");
    } else {
      router.push("/listfood");
    }
  }

  if (!action) {
    return (
      <Fragment>
        {page == "add" ? (
          <button onClick={pushRouter} className="button">
            <IoMdAdd className="button-icon" size={32} />
          </button>
        ) : (
          <button onClick={pushRouter} className="button">
            <BsList className="button-icon" size={32} />
          </button>
        )}
      </Fragment>
    );
  }

  return (
    <Fragment>
      {type == "addfood" ? (
        <button type="submit" className="button">
          <IoMdAdd className="button-icon" size={32} />
        </button>
      ) : (
        <button onClick={click} className="button button__disabled">
          <IoMdTrash size={32} />
        </button>
      )}
    </Fragment>
  );
};
