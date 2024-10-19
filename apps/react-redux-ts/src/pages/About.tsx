import { useState } from "react";
import "../App.css";
import request from "../utils/http";
import { Button } from "antd";

function About() {
  const [res, setRes] = useState<any>("");

  const spanStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <>
      APP
      <Button
        onClick={() => {
          request.get("/test").then((res) => {
            setRes(res);
            console.log("----收到啦---", res);
          });
        }}
      >
        测试请求
      </Button>
      <span className="text-3xl font-bold underline">{res.toString()}</span>
      <span style={spanStyle}>测试 css in js px转换vw</span>
    </>
  );
}

export default About;
