import { Button, Form, Input, message } from "antd";
import { getCaptchaApi, loginApi } from "../apis/auth";
import React, { useState } from "react";
import request from "../utils/http";

const Login = () => {
  getCaptchaApi();
  const [res2, setRes2] = useState<any>("");

  const getSse = () => {
    request.get("/sse").then((res:any) => {
      setRes2(res);
      console.log("----收到啦---", res.toString());
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          remember: true,
          username: "admin",
          password: "123456",
        }}
        autoComplete="off"
        onFinish={async (values) => {
          const res = await loginApi(values);
          if (res.code === 200) {
            message.success("登录成功");
            getSse()
          } else {
            message.error(res.message);
          }
        }}
        style={{
          width: "400px",
        }}
      >
        <h3>Login</h3>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="captcha"
          rules={[
            { required: true, message: "Please input your validate code!" },
          ]}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input placeholder="请输入验证码" />
            <div id="svgContainer"></div>
          </div>
        </Form.Item>
        <Form.Item>
          <Input type="submit" value={"登录"} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default React.memo(Login);
