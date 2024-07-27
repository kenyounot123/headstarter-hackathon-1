// seed.ts
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from "@/lib/prisma";

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});

  // Seed data
  const users = [
    {}
  ]
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'Content for the first post',
          },
          {
            title: 'Second Post',
            content: 'Content for the second post',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
