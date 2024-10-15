export const TOKEN_KEY: string = "ACCESS_TOKEN";
export const REFRESH_TOKEN_KEY: string = "REFRESH_TOKEN";

/**
 * @description 设置token
 * @param token token
 * @returns void
 */
export function setToken(token: string) {
  return localStorage.setItem(TOKEN_KEY, token);
}

/**
 * @description 获取token
 * @returns token
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * @description 移除token
 * @returns void
 */
export function removeToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

/**
 * @description 设置refresh token
 * @param token refresh token
 * @returns void
 */
export function setRefreshToken(token: string) {
  return localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

/**
 * @description 获取refresh token
 * @returns string
 */
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * @description 移除refresh token
 * @returns void
 */
export function removeRefreshToken() {
  return localStorage.removeItem(REFRESH_TOKEN_KEY);
}
