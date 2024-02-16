import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      proxy: {
        // with options: http://localhost:5173/api-> https://graphql.contentful.com/content/v1/spaces/:space-id
        '/api': {
          target: `https://graphql.contentful.com/content/v1/spaces/${env.VITE_CONTENTFUL_SPACE_ID}`,
          headers: {
            Authorization: `Bearer ${env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
