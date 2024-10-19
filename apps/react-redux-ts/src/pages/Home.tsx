import { Button } from "antd";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div>
      Home
      <Button>
        <Link to="/login">登录页</Link>
      </Button>
      <Button>
        <Link to="/about">测试页</Link>
      </Button>
    </div>
  );
};
