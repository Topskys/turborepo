import { useState } from "react";
import "./App.css";
import request from "./utils/http";
import Login from "./pages/Login";
import { Button } from "antd";

function App() {
  const [res, setRes] = useState<any>("");

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
      <Login />
    </>
  );
}

export default App;
