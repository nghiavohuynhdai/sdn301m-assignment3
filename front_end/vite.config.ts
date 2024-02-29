import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@view': __dirname + '/src/view',
      '@data': __dirname + '/src/data'
    }
  }
})
