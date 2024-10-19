import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import pxToVwPlugin from "./px-to-vw-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    react(),
    // px转vw
    // pxToVwPlugin({
    //   rootValue: 1080, // 基准大小
    //   unitPrecision: 5, // 精度
    //   minPixelValue: 1, // 小于此值的 px 将不被转换
    //   mediaQuery: false, // 是否在媒体查询中转换
    // }),
  ],
  resolve: {
    // 定义别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
