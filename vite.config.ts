import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],

  build: {
    rollupOptions: {
      input: {
        plugin: 'src/plugin.ts',
        main: 'src/main.ts',
        model: 'src/model.ts',
        index: './index.html'
      },
      output: {
        entryFileNames: '[name].js',
      }
    }
  },

  preview: {
    port: 4400
  }
})
