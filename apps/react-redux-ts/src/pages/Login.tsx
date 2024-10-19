import { Form, Input, message } from "antd";
import { getCaptchaApi, loginApi } from "../apis/auth";
import React, { useEffect } from "react";
import request from "../utils/http";

const Login = () => {
  const getSvgCaptcha = (id: string = "svgContainer") => {
    const svgContainer = document.getElementById(id)!;
    getCaptchaApi()
      .then((svgString: any) => {
        svgContainer.innerHTML = svgString;
      })
      .catch(() => {
        svgContainer.innerHTML = `<img src="/captcha" alt="失败" />`;
      });
  };

  useEffect(() => {
    getSvgCaptcha();
    return () => {
      getSvgCaptcha();
    };
  }, []);

  const getSse = () => {
    request.get("/sse").then((res: any) => {
      console.log("----收到啦---", res.toString());
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f4f6f9]">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          remember: true,
          username: "admin",
          password: "123456",
        }}
        size="large"
        autoComplete="off"
        onFinish={async (values) => {
          const res = await loginApi(values);
          if (res.code === 200) {
            message.success("登录成功");
            getSse();
          } else {
            message.error(res.message);
          }
        }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="text-2xl font-bold mb-4">登录</div>
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
          <div className="flex justify-between items-center">
            <Input placeholder="请输入验证码" className="flex-1" />
            <div
              id="svgContainer"
              className="w-[80px] h-[40px] cursor-pointer"
              onClick={() => getSvgCaptcha()}
            ></div>
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
