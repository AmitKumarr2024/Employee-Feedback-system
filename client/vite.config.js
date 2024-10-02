import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://employee-feedback-system-554y.onrender.com/', // Ensure this is your correct backend URL
        changeOrigin: true,
        secure: true, // Keep this as true for HTTPS
      },
    },
  },
});
