"use client";

import "./page.scss";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { Button } from "antd";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function DashboardPage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [limit, setLimit] = useState(null);
  const router = useRouter();
  const localStorageLimit = localStorage.getItem("limit");
  const sessionStorageAuth = sessionStorage.getItem("user");

  useEffect(() => {
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
  }, [auth.currentUser, localStorageLimit, router]);

  function handleLimit(data) {
    const value = data.get("limit");
    localStorage.setItem("limit", value);
    setLimit(value);
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (!sessionStorageAuth) {
    router.push("/");
  }

  return (
    <div className="container-dashboard">
      <MdDashboardCustomize size={110} />
      <h1>{user ? `Welcome ${user}!` : "Login não realizado!"}</h1>
      <div className="data">
        <div className="limit">
          {limit ? (
            <div className="container-limit">
              <span>R$ {limit}</span>
              <button className="limit-button" onClick={() => setLimit(null)}>
                <CiEdit size={26} />
              </button>
            </div>
          ) : (
            <form className="form-limit" action={handleLimit}>
              <input className="limit-input" name="limit" type="number" />
              <button className="limit-button" type="submit">
                OK
              </button>
            </form>
          )}
        </div>
        <div className="cost">
          <p style={{ fontWeight: "bold" }}>GASTO TOTAL</p>
          <span style={{ color: "red" }}>R$200</span>
        </div>
        <div className="sale">
          <p style={{ fontWeight: "bold" }}>SALDO</p>
          <span style={{ color: "green" }}>R$300</span>
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
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}
