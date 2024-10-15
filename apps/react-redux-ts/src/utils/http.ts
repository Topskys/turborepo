import axios, { InternalAxiosRequestConfig } from "axios";
import {
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "./token";
import { refreshTokenApi, isRefreshToken } from "../apis";
import { message } from "antd";
import router from "../router";

/**
 * 自定义响应类型
 */
export type CustomResponse<T> = {
  code: number;
  data?: T;
  message?: string;
};

/**
 * 扩展 AxiosRequestConfig 类型以包含 __isRefreshToken 属性
 */
export type CustomAxiosRequestConfig = InternalAxiosRequestConfig<any> & {
  __isRefreshToken?: boolean;
};

export const ins = axios.create({
  baseURL: "http://localhost:8000/api",
});

ins.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  if (getToken()) {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  return config;
});

ins.interceptors.response.use(
  async (res) => {
    // 设置token（需要后端暴露响应头）
    const token = res.headers.authorization;
    if (token) {
      setToken(token);
      ins.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    // 设置刷新token
    const refreshToken = res.headers.refreshtoken;
    if (refreshToken) setRefreshToken(refreshToken);
    // 无权限
    if (res.data.code === 401 && !isRefreshToken(res.config)) {
      console.log("刷新token");
      // 刷新token
      const isSuccess = await refreshTokenApi();
      if (isSuccess) {
        console.log("刷新token", isSuccess);
        // 重新请求（需要更新请求配置，否则会无限循环此过程）
        res.config.headers["Authorization"] = `Bearer ${getToken()}`;
        return await ins.request(res.config);
      } else {
        // 刷新token失败
        removeToken();
        removeRefreshToken();
        // 跳转登录页
        router.navigate("/login", { replace: true });
      }
    }
    return res.data;
  },
  (error) => {
    const { message: msg, response } = error;
    const errorInfo = msg ?? response.data?.message;
    message.error(errorInfo);
    return Promise.reject(error);
  }
);

export default ins;
