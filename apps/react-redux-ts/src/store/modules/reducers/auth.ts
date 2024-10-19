import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoAsync, loginAsync } from "../actions";
import { AuthStateType } from "../../../types";

// 定义state初始值
const initialState: AuthStateType = {
  token: "",
  refreshToken: "",
  userInfo: undefined,
};

// 定义异步actions
// ../actions/auth.ts

// 创建slice
const userSlice = createSlice({
  name: "auth", // name必须与configureStore.ts中的reducer保持一致
  initialState, // 初始状态
  reducers: {
    // 定义同步reducer
    
  },
  extraReducers(builder) {
    // 定义异步reducer
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // 登录成功后设置token和refreshToken
      state.token = action.payload!.token;
      state.refreshToken = action.payload!.refreshToken;
    });
    builder.addCase(getUserInfoAsync.fulfilled, (state, action) => {
      // 异步请求成功后，更新state用户信息
      state.userInfo = action.payload;
    });
  },
});

// 导出actions
export const {  } = userSlice.actions;
// 导出reducer
export default userSlice.reducer;
