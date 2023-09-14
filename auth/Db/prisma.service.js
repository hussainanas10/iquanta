import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.MYSQL,
    },
  },
});

async function main() {
  try {
    await prisma.$connect();
    return 'Connected to DB..';
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export { main, prisma };
