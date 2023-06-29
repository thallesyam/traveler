/// <reference types="vitest" />
import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  test: {
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/infra/repositories/database/prisma/**',
        '**/infra/factories',
      ]

    }
  }
})