import { defineConfig } from 'vite';

export default defineConfig({
  // ⚙️  Root URL configuration for https://bitlife-77.github.io
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
