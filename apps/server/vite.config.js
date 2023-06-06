/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})