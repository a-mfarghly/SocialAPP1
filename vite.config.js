import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/SocialAPP 1/', // مهم جداً ل GitHub Pages
})