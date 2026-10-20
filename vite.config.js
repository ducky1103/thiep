import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        thiep: resolve(__dirname, 'thiep-moi.html'),
      },
    },
  },
  server: {
    open: '/thiep-moi.html',
  },
})
