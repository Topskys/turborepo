import { LoginResult, UserInfo } from "../types";
import { getRefreshToken } from "../utils";
import request, {
  CustomAxiosRequestConfig,
  CustomResponse,
} from "../utils/http";

/**
 * 获取验证码
 */
export function getCaptchaApi() {
  return request({
    url: "/captcha",
    method: "POST",
    responseType: "text", // 设置响应类型为text or blob
  });
}

/**
 * 登录接口
 *
 * @param data { username: string; password: string; captcha: string; }
 * @returns
 */
export async function loginApi(data: {
  username: string;
  password: string;
  captcha: string;
}): Promise<CustomResponse<LoginResult>> {
  return await request({
    url: "/login",
    method: "post",
    data,
  });
}

/**
 * 刷新token
 */
let promise: Promise<any> | null = null; // 用于防止刷新token时多次请求
export async function refreshTokenApi() {
  // 存在则沿用上次的刷新请求，防止多次请求
  if (promise) return promise;
  // 刷新token
  promise = new Promise(async (resolve) => {
    const res = (await request.get("/refresh-token", {
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
      },
      __isRefreshToken: true, // 自定义属性，用于标识此请求为刷新token请求
    } as CustomAxiosRequestConfig)) as CustomResponse<any>;
    resolve(res.code === 200);
  });
  promise.finally(() => {
    promise = null;
  });
  return promise;
}

export function isRefreshToken(config: CustomAxiosRequestConfig) {
  return !!config.__isRefreshToken;
}

/**
 * 获取当前用户信息
 *
 * 例如：
 * return {
 *  code: 200,
 *  message:"ok",
 *  data: {
 *     roles:[], // 用户角色
 *     permissions: [], // 用户（按钮）权限
 *     id:"1",
 *     username:"admin",
 *     nickname:"管理员",
 *     avatar:"https://xxx.com/avatar.jpg"
 *     phone:"18700001234", // 手机号
 *     email:"34256789@qq.com", // 邮箱地址
 *  }
 * }
 */
export async function getUserInfoApi(): Promise<CustomResponse<UserInfo>> {
  return await request.get("/user-info");
}

/**
 * 获取路由菜单
 */
export async function getRouterApi(): Promise<CustomResponse<any[]>> {
  return await request.get("/router");
}
