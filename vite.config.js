import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fcav-lite',
  plugins: [react()],
  build: {
    minify: false,
  },
});
