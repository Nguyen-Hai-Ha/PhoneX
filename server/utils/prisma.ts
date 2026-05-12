// server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      // Dùng useRuntimeConfig để lấy databaseUrl đã định nghĩa trong nuxt.config.ts
      url: useRuntimeConfig().databaseUrl 
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
