import 'dotenv/config'
import path from 'node:path'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: env('DATABASE_URL'),
    // если нужно: shadowDatabaseUrl: env('SHADOW_DATABASE_URL'),
  },
  // если используешь миграции:
  migrations: {
    path: path.join('prisma', 'migrations'),
  },
})
