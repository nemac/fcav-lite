import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
base: '/fcav-lite'
export default defineConfig({
  plugins: [react()],
})
