import { Navigate, useLocation } from "react-router-dom";

type BeforeRouterEntryPropsType = {
  children: React.ReactNode;
};

/**
 * 路由前置守卫
 */
export const WithBeforeRouterEntry = ({
  children,
}: BeforeRouterEntryPropsType) => {
  // 获取当前路由的路径
  const { pathname } = useLocation();
  // 判断是否登录
  const token = localStorage.getItem("token");
  if (!token && pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AuthRouter = ({ children }: BeforeRouterEntryPropsType) => {
  // 获取当前路由的路径
  const { pathname } = useLocation();
  const token = "store.auth.token";
  const whileList = ["/login", "/404", "/403"];
  if (!token) {
    if (!whileList.includes(pathname)) {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  }
  // 跳转主页
  if (pathname === "/login") {
    return <Navigate to="/" replace />;
  }
  // 从store中获取动态路由
  const dynamicRoutes: any[] = [];
  const staticRoutes: any[] = [];
  const routeList = [...dynamicRoutes, staticRoutes];
  if (!routeList.includes(pathname)) {
    return <Navigate to="/404" replace />;
  }
  return children;
};
