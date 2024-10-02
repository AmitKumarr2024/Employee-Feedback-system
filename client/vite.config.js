import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://employee-feedback-system-554y.onrender.com', // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
