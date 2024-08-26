"use client";

import "./page.scss";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { Button } from "antd";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

export default function DashboardPage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [limit, setLimit] = useState(null);
  const router = useRouter();
  const [value, setValue] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const sessionStorageAuth = sessionStorage.getItem("user");
    if (!sessionStorageAuth) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const localStorageLimit = localStorage.getItem("limit");

    if (auth.currentUser) {
      const emailReceived =
        auth.currentUser.email.charAt(0).toUpperCase() +
        auth.currentUser.email.slice(1);
      const newEmail = emailReceived.replace(/@.*/, "");
      setUser(newEmail);
    }
    if (localStorageLimit) {
      setLimit(localStorageLimit);
    }
  }, [auth.currentUser, router]);

  useEffect(() => {
    const storage = localStorage.getItem("food");
    const obj = JSON.parse(storage);
    const values = obj.map((item) => parseInt(item.value));
    const totalValues = values.reduce((acc, valorAtual) => acc + valorAtual, 0);
    setValue(totalValues);
  }, [value]);

  useEffect(() => {
    if (limit && auth.currentUser && value) {
      const result = limit - value;
      setSaldo(result);
    }
  }, [auth.currentUser, limit, value]);

  function handleLimit(data) {
    const value = data.get("limit");
    if (value) {
      localStorage.setItem("limit", value);
      setLimit(value);
    }
    setEdit(true);
  }

  return (
    <>
      <div className="container-dashboard">
        <MdDashboardCustomize size={110} />
        <h1>{user ? `Welcome ${user}!` : "Login não realizado!"}</h1>
        <div className="data">
          <div className="limit">
            <p style={{ fontWeight: "bold", textAlign: "center" }}>LIMITE</p>
            {edit ? (
              <div className="container-limit">
                <span>R$ {limit}</span>
                <button className="limit-button" onClick={() => setEdit(false)}>
                  <CiEdit size={20} />
                </button>
              </div>
            ) : (
              <form className="form-limit" action={handleLimit}>
                <input
                  placeholder={limit}
                  className="limit-input"
                  name="limit"
                  type="number"
                  style={{ padding: "0.8rem" }}
                />
                <button className="limit-button" type="submit">
                  OK
                </button>
              </form>
            )}
          </div>
          <div className="cost">
            <p style={{ fontWeight: "bold" }}>GASTO TOTAL</p>
            <span style={{ color: "red" }}>R$ {value}</span>
          </div>
          <div className="sale">
            <p style={{ fontWeight: "bold" }}>SALDO</p>
            <span style={{ color: "green" }}>R$ {saldo}</span>
          </div>
        </div>
        <div className="container-buttons">
          <Button
            type="primary"
            size="large"
            style={{ width: "4rem", height: "4rem" }}
            onClick={() => router.push("/addfood")}
            danger
          >
            <IoIosAdd size={42} />
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ width: "4rem", height: "4rem" }}
            onClick={() => router.push("/listfood")}
            danger
          >
            <FaList size={26} />
          </Button>
        </div>
      </div>
    </>
  );
}
