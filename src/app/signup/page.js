"use client";

import { React } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Form from "../components/Form/Form";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="container">
      <IoPersonAdd className="icon-lock" size={110} />
      <Form router={router} type="signup" />
    </div>
  );
}
