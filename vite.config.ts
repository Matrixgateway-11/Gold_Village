import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The site needs no PostCSS plugins. Declaring the config inline stops Vite from
  // loading a stray postcss.config.js (e.g. the old Tailwind one OneDrive may restore).
  css: { postcss: { plugins: [] } },
})
