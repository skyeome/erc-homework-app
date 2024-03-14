import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "ERC Homework",
        short_name: "ERC Homework",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        description: "English Reading Club Homework App",
        theme_color: "#65C3C8",
        icons: [
          {
            src: "/android-icon-36x36.png",
            sizes: "36x36",
            type: "image/png",
          },
          {
            src: "/android-icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://openapi.naver.com/v1/search",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
