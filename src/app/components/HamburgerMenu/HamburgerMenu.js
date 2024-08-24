"use client";
import React, { useState } from "react";
import "./index.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from "@/app/auth-config/auth-config";

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
    <>
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
              <Link href={"/"}>Home</Link>
            </li>

            <li>
              <Link href={"/signup"}>Sign Up</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/addfood"}>Add Food</Link>
            </li>
            <li>
              <Link href={"/listfood"}>List Food</Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default HamburgerMenu;
