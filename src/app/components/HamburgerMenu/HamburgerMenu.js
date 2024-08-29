"use client";
import React, { Fragment, useState } from "react";
import "./index.scss";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "@/app/auth-config/auth-config";
import { Transition } from "../Transition/Transition";

function HamburgerMenu() {
  const auth = getAuth();
  const { logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const router = useRouter();

  function handleLogout() {
    logOut(router);
  }

  return (
    <Fragment>
      <header className="header">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </header>
      <nav className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="nav-drawer">
          <button className="close-btn" onClick={toggleMenu}>
            ×
          </button>
          <button onClick={handleLogout} className="close-btn">
            <RiLogoutBoxLine size={20} />
          </button>
        </div>
        {!auth.currentUser ? (
          <ul>
            <li>
              <Transition href="/">Home</Transition>
            </li>

            <li>
              <Transition href="/signup">Sign Up</Transition>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Transition href="/dashboard">Dashboard</Transition>
            </li>
            <li>
              <Transition href="/addfood">Add Food</Transition>
            </li>
            <li>
              <Transition href="/listfood">List Food</Transition>
            </li>
          </ul>
        )}
      </nav>
    </Fragment>
  );
}

export default HamburgerMenu;
