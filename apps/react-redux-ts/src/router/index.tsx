import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Login from "../pages/Login";
import About from "../pages/About";
import { Result, Button } from "antd";
import { Home } from "../pages/Home";
import { usePermission } from "../hooks/usePermission";

type MetaType = {
  requiresAuth?: boolean;
  title: string;
  icon: string;
  key: string;
  roles: string[];
};

type RouteObjectType = RouteObject & {
  meta?: MetaType;
};

const NoPermission = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, not authorized."
      extra={
        <Button type="primary" onClick={() => window.history.back()}>
          Back Home
        </Button>
      }
    />
  );
};

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => window.history.back()}>
          Back Home
        </Button>
      }
    />
  );
};

const staticRoutes: RouteObjectType[] = [
  {
    path: "/",
    element: <Home />,
    meta: {
      requiresAuth: true, // 需要登录
      title: "首页", // 菜单标题
      icon: "home", // 菜单图标
      key: "home", // 菜单key
      roles: ["admin", "user"],
    },
    children:[]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/403",
    element: <NoPermission />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

const router = createBrowserRouter(staticRoutes);

export default router;

/**
 * 权限控制高阶组件
 */
type WithButtonPermissionProps = {
  key: string; // 权限key
  children: JSX.Element; // 按钮组件
};
export const WithButtonPermission = (
  props: WithButtonPermissionProps
): JSX.Element | null => {
  // TODO：实现权限判断逻辑
  const { hasButtonPermission } = usePermission();
  const isAllowed = hasButtonPermission(props.key);
  return isAllowed ? props.children : null;
};
