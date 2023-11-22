import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5070/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
// why when I fetched a data from this url  https://premier-league-standings1.p.rapidapi.com/ from my client side to fetch some data to put inside my website It doesn't print CORS error althouth I didn't put the confiq for that even when i was work with my nodejs i put my origin like that only:
// server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5070/api",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
