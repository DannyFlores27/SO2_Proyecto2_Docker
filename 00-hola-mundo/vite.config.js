import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/usuarios': {
        target: 'http://localhost:3000', // dirección de tu backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
