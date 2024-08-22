"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { IoMdLock } from "react-icons/io";
import "./page.scss";
import Link from "next/link";

export default function Home() {
  function onFinish(values) {
    console.log(values);
  }

  return (
    <div className="container-login">
      <IoMdLock className="icon-lock" size={110} />
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
          style={{ width: "80%" }}
        >
          <Input
            style={{ height: "3rem" }}
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          style={{ width: "80%" }}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            style={{ height: "3rem" }}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item className="container-buttons">
          <div className="buttons">
            <Button
              style={{ height: "3rem" }}
              block
              type="primary"
              danger
              htmlType="submit"
            >
              Log in
            </Button>
            or
            <Link href="/signup">
              <Button style={{ height: "3rem" }} block type="primary" danger>
                Sign up
              </Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
