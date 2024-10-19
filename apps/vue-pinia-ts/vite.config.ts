import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 自动按需导入element plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
//自动按需导入icons
// import IconResolver from "unplugin-icons/resolver";
// import Icons from "unplugin-icons/vite";

// https://element-plus.org/zh-CN/guide/quickstart.html
// https://blog.csdn.net/weixin_50865103/article/details/139598167
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        //icons
        // IconResolver({ prefix: "icon" })
      ],
    }),
    Components({
      resolvers: [
        //自动导入 Element Plus 组件
        ElementPlusResolver(),
        //icons
        // IconResolver(
        //   { enabledCollections: ["ep"] } //element-plus图标库 需要修改图标使用方法
        // ),
      ],
    }),
    //icons
    //  Icons({ autoInstall: true }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
