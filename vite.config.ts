import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    host: true,
    open: true,
    hmr: {
      port: 5174
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
}) 