import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 4327,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4328,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three'
          }
          if (
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/lenis') ||
            id.includes('node_modules/animejs')
          ) {
            return 'motion'
          }
          return undefined
        },
      },
    },
  },
})
