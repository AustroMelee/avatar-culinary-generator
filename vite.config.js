import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@core': resolve(__dirname, './src/core'),
      '@data': resolve(__dirname, './src/core/data'),
      '@utils': resolve(__dirname, './src/utils'),
      '@src': resolve(__dirname, './src'),
    },
  },
});
