import { getRefreshToken } from "../utils";
import request, { CustomAxiosRequestConfig, CustomResponse } from "../utils/http";

/**
 * 获取验证码
 */
export function getCaptchaApi() {
  const imgUrl = "http://localhost:8000/api/captcha";
  fetch(imgUrl, { method: "post" })
    .then((response) => response.text())
    .then((svgString) => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
      document
        .getElementById("svgContainer")!
        .appendChild(svgDoc.documentElement);
    }) .catch(error => console.error('Error fetching SVG:', error));
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
}) {
  return (await request({
    url: "/login",
    method: "post",
    data,
  })) as CustomResponse<any>;
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
