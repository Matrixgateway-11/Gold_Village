import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The site needs no PostCSS plugins. Declaring the config inline stops Vite from
  // loading a stray postcss.config.js (e.g. the old Tailwind one OneDrive may restore).
  css: { postcss: { plugins: [] } },
  build: {
    rollupOptions: {
      output: {
        // Stable vendor chunks cache well across deploys; the catalogue JSON gets its own file.
        manualChunks(id) {
          if (id.includes('src/data/catalog.json')) return 'catalog'
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler|@remix-run)\//.test(id)) return 'react'
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
          if (/node_modules\/(swiper|ssr-window|dom7)\//.test(id)) return 'swiper'
          if (id.includes('node_modules/@radix-ui')) return 'radix'
          return undefined
        },
      },
    },
  },
})
