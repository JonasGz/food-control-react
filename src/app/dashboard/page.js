"use client";

import React from "react";
import "./page.scss";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { Button } from "antd";

export default function DashboardPage() {
  return (
    <div className="container-dashboard">
      <MdDashboardCustomize size={110} />
      <div className="data">
        <div className="limit">
          <p style={{ fontWeight: "bold" }}>LIMITE</p>
          <span>R$500</span>
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
          danger
        >
          <IoIosAdd size={42} />
        </Button>
        <Button
          type="primary"
          size="large"
          style={{ width: "4rem", height: "4rem" }}
          danger
        >
          <FaList size={26} />
        </Button>
      </div>
    </div>
  );
}
