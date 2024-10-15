import { useNavigate } from "react-router-dom";
import { getToken } from "../utils";

export function useCheckLogin() {
  /**
   * TODO: check login
   * 1. 检查登录状态
   * 2. 如果未登录，跳转登录页面
   * 3. 如果已登录，返回用户信息
   *
   */
  const navigate = useNavigate();
  const token = getToken();
  // 未登录
  if (!token) return navigate("/login");
  // 已登录
  return token;
}
