import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    host: true,
    open: false, // Disable auto-open to prevent multiple browser instances
    hmr: {
      port: 5175,
      overlay: false,
      clientPort: 5175
    },
    watch: {
      usePolling: false,
      ignored: [
        '**/node_modules/**', 
        '**/dist/**',
        '**/.git/**',
        '**/coverage/**',
        '**/temp/**',
        '**/tmp/**'
      ]
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  // Add file change debouncing to prevent rapid refreshes
  optimizeDeps: {
    include: [],
    exclude: []
  }
}) 