"use client";

import React from "react";
import Navbar from "../Navbar";

export const Page = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};
