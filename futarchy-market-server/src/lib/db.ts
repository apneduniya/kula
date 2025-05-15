import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Use existing prisma instance if available in global scope (for hot reloading)
// or create a new instance
export const db = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Assign prisma to global object in non-production environments to prevent
// multiple instances during hot reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}
