import { useCheckLogin } from "./useCheckLogin";

/**
 * （路由、按钮）权限判断
 */
export function usePermission() {
  const {} = useCheckLogin();
  const routeList: any = []; // 路由权限
  const buttonList: any = []; // 按钮权限

  const hasPermission = (permissions: string[], key: string) => {
    return permissions.includes(key);
  };

  // 路由权限
  const hasRouterPermission = (key: string) => {
    return hasPermission(routeList, key);
  };

  // 按钮权限
  const hasButtonPermission = (key: string) => {
    return hasPermission(buttonList, key);
  };

  return {
    hasPermission,
    hasRouterPermission,
    hasButtonPermission,
    routeList,
    buttonList,
  };
}

// 按钮权限
// "/sys/user":["add","edit","delete","view","import","export"]
