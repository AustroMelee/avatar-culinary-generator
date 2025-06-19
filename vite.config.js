import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@core': resolve(__dirname, './src/core'),
      '@data': resolve(__dirname, './src/core/data'),
      '@utils': resolve(__dirname, './src/utils'),
      '@src': resolve(__dirname, './src'),
    },
  },
});
