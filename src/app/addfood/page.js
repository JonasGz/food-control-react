"use client";
import React, { useEffect } from "react";
import { GiHamburger } from "react-icons/gi";
import { Button, Form, Input } from "antd";
import { IoIosAdd } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";

import "./page.scss";
import { useRouter } from "next/navigation";

export default function AddFoodPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionStorageAuth = sessionStorage.getItem("user");
      if (!sessionStorageAuth) {
        router.push("/");
      }
    }
  }, [router]);

  function handleClick(data) {
    const id = Math.random();
    const newFood = { ...data, id };
    const existingFood = JSON.parse(localStorage.getItem("food")) || [];
    const updateFood = [...existingFood, newFood];
    localStorage.setItem("food", JSON.stringify(updateFood));
    router.push("/listfood");
  }

  function clearInput() {
    form.resetFields();
  }

  return (
    <div className="container-addfood">
      <GiHamburger size={110} />
      <Form
        form={form}
        name="addfood"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onFinish={handleClick}
      >
        <Form.Item
          name="food"
          rules={[
            {
              required: true,
              message: "Please input your Food!",
            },
          ]}
          style={{ width: "80%" }}
        >
          <Input style={{ height: "3rem" }} placeholder="Pizza" />
        </Form.Item>
        <Form.Item
          name="value"
          rules={[
            {
              required: true,
              message: "Please input your Value!",
            },
          ]}
          style={{ width: "80%" }}
        >
          <Input type="number" placeholder="50.00" style={{ height: "3rem" }} />
        </Form.Item>
        <div className="container-buttons">
          <Button
            type="primary"
            size="large"
            style={{ width: "4rem", height: "4rem" }}
            htmlType="submit"
            danger
          >
            <IoIosAdd size={42} />
          </Button>
          <Button
            type="default"
            size="large"
            style={{ width: "4rem", height: "4rem" }}
            danger
            onClick={clearInput}
          >
            <IoMdTrash size={26} />
          </Button>
        </div>
      </Form>
    </div>
  );
}
