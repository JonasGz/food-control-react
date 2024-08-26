"use client";

import { React } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { IoPersonAdd } from "react-icons/io5";
import "./page.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-config/auth-config";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();

  function handleSignUp(values) {
    const email = values.username;
    const password = values.password;
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (emailPattern.test(email) && passwordPattern.test(password)) {
      signUp(email, password, router);
    } else {
      console.log("Email ou senha inválidos!");
    }
  }

  return (
    <div className="container-login">
      <IoPersonAdd className="icon-lock" size={110} />
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onFinish={handleSignUp}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
          style={{ width: "80%" }}
        >
          <Input
            style={{ height: "3rem" }}
            prefix={<UserOutlined />}
            placeholder="Email"
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
        <Form.Item style={{ display: "none" }}>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item className="container-buttons-signup">
          <div className="buttons">
            <Button
              style={{ height: "3rem" }}
              block
              type="primary"
              danger
              htmlType="submit"
            >
              Sign up
            </Button>
            or
            <Link href="/">
              <Button style={{ height: "3rem" }} block type="primary" danger>
                Log in
              </Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
