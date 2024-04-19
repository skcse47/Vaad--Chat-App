import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    proxy: {
      "/api": {
        target: "https://vaad-chat-app.onrender.com",
        // rewrite: (path) => path.replace(/^\/api/, ''), // Remove the "/api" prefix
      }
    }
  },
})

