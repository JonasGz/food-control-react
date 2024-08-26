"use client";

import React from "react";
import { IoMdLock } from "react-icons/io";
import "./page.scss";
import { useRouter } from "next/navigation";
import Form from "./components/Form/Form";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <IoMdLock className="icon-lock" size={110} />
      <Form router={router} type="login" />
    </div>
  );
}
