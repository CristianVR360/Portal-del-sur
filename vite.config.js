import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portal-del-sur/',
  server: {
    host: true, // Esto expone el servidor a la red local (0.0.0.0)
  },
})
