import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRouterApi, getUserInfoApi, loginApi } from "@/apis";

/**
 * 定义异步action，登录
 */
export const loginAsync = createAsyncThunk(
  "post/login",
  async (action: any) => {
    const response = await loginApi(action);
    return response.data;
  }
);

/**
 * 定义异步action，获取当前用户信息
 */
export const getUserInfoAsync = createAsyncThunk("get/userInfo", async () => {
  const response = await getUserInfoApi();
  return response.data;
});

/**
 * 定义异步action，获取菜单
 */
export const getMenuAsync = createAsyncThunk(
  "get/menu",
  async () => (await getRouterApi()).data
);
