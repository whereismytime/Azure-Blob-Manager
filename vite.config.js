import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://blobsapp-dddrgbehh2fsdphw.canadacentral-01.azurewebsites.net'
    }
  }
})
