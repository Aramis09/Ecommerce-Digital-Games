import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),compression({ext: '.html,.css,.js,.json'})],
  server: { 
    port: 3000
  },
},)


