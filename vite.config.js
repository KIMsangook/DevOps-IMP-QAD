import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프록시 대상: /portal 로 시작하는 모든 요청
      "/portal": {
        target: "http://coverdreamit.iptime.org:8401",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
