import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    proxy: {
      "/api": {
        target: "http://vaad-chat-app.netlify.app",
        // rewrite: (path) => path.replace(/^\/api/, ''), // Remove the "/api" prefix
      }
    }
  },
})

