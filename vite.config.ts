import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    host: true,
    open: true,
    hmr: {
      port: 5175, // Use different port for HMR to prevent conflicts
      overlay: false // Disable error overlay that might cause refreshes
    },
    watch: {
      usePolling: false, // Disable polling to prevent excessive file watching
      ignored: ['**/node_modules/**', '**/dist/**']
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
}) 