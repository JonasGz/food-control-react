"use client";

import "./page.scss";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { Button } from "antd";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ProtectPage } from "../components/ProtectPage/ProtectPage";
import { Loading } from "../components/Loading/Loading";

export default function DashboardPage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [limit, setLimit] = useState(null);
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [saldo, setSaldo] = useState(null);
  const [edit, setEdit] = useState(true);
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
    const localStorageLimit = localStorage.getItem("limit");

    if (auth.currentUser) {
      const emailReceived =
        auth.currentUser.email.charAt(0).toUpperCase() +
        auth.currentUser.email.slice(1);
      const newEmail = emailReceived.replace(/@.*/, "");
      setName(newEmail);
    }
    if (localStorageLimit) {
      setLimit(localStorageLimit);
    }
  }, [auth.currentUser, router]);

  useEffect(() => {
    const storage = localStorage.getItem("food");
    if (storage) {
      const obj = JSON.parse(storage);
      const values = obj.map((item) => parseInt(item.value));
      const totalValues = values.reduce(
        (acc, valorAtual) => acc + valorAtual,
        0
      );
      setValue(totalValues);
    }
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

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <ProtectPage />;
  }

  return (
    <>
      <div className="container-dashboard">
        <MdDashboardCustomize size={110} />
        <h1>{user ? `Welcome ${name}!` : "Login não realizado!"}</h1>
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
