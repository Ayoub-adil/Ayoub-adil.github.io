import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { open: true },
  build: {
    outDir: 'dist',
    // three.js + r3f are lazy-loaded in their own chunk
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cv: resolve(__dirname, 'cv/index.html'),
      },
    },
  },
})
