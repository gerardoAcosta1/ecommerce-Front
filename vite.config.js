import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/


// vite.config.js


// El resto de tu código es igual...
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Cuando React pide /images, lo manda al puerto 3001
      '/images': {
        target: 'https://mi-tienda-backend-ewfh.onrender.com', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})