import { useRouter } from "next/navigation";
import React from "react";
import "../../../styles/reset.scss";
import "./index.scss";

export const ProtectPage = () => {
  const router = useRouter();
  return (
    <div className="container-protect-page">
      <h2>Página restrita a usuários, por favor realize o login:</h2>
      <button
        className="container-protect-page__button"
        onClick={() => router.push("/")}
      >
        Sign in
      </button>
    </div>
  );
};
