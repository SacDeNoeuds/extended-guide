import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const resolved = path.resolve(path.dirname(filename), './src')
console.info('resolved', resolved)

export default defineConfig({
  root: './src',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolved,
    }
  }
})