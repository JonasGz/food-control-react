import React, { useState } from "react";
import { useAuth } from "../../auth-config/auth-config";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "./Form.scss";

const Form = ({ router, type }) => {
  const [typePassword, setTypePassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp } = useAuth();

  function togglePassword() {
    if (typePassword == "text") {
      setTypePassword("password");
    } else {
      setTypePassword("text");
    }
  }

  function onChange({ target }) {
    if (target.type == "email") {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  }

  function handleAction() {
    event.preventDefault();

    if (type == "login") {
      signIn(email, password, router);
    } else {
      const emailPattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordPattern =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
      if (emailPattern.test(email) && passwordPattern.test(password)) {
        signUp(email, password, router);
      } else {
        console.log("Email ou senha inválidos!");
      }
    }
  }

  return (
    <form onSubmit={handleAction} className="container-form">
      <div className="container-form__inputs">
        <input
          type="email"
          placeholder="fulanodetal@gmail.com"
          className="container-form__input"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <div className="container-form__password">
          <input
            type={typePassword}
            placeholder="**********"
            className="container-form__input-password"
            name="password"
            required
            value={password}
            onChange={onChange}
          />
          <div
            onClick={togglePassword}
            className="container-form__eye-password"
          >
            {typePassword == "text" ? (
              <FaRegEye size={18} />
            ) : (
              <FaRegEyeSlash size={18} />
            )}
          </div>
        </div>
      </div>

      {type == "login" ? (
        <div className="container-form__buttons">
          <button type="submit" className="container-form__button">
            Log in
          </button>
          <span style={{ fontSize: "0.8rem", textAlign: "center" }}>
            Not account?
          </span>
          <button
            onClick={() => router.push("/signup")}
            type="button"
            className="container-form__button container-form__button--disabled"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="container-form__buttons">
          <button type="submit" className="container-form__button">
            Sign Up
          </button>
          <button
            onClick={() => router.push("/")}
            type="button"
            className="container-form__button container-form__button--disabled"
          >
            Sign In
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
