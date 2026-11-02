import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendTarget = env.VITE_PROXY_TARGET || "http://127.0.0.1:5000";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
          configure(proxy) {
            proxy.on("error", (error) => {
              console.error(
                `[Vite API proxy] Could not reach ${backendTarget}: ${error.message}`
              );
            });
          },
        },
      },
    },
  };
});
