import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rwjoias/',  // IMPORTANTE: nome do repositório
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
