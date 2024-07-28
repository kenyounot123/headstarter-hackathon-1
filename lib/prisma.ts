// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;
// import { PrismaClient } from "@prisma/client";

// // Check if prisma is already initialized on global object
// const prisma = globalThis.prisma || new PrismaClient();

// // Assign to global object
// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

// export default prisma;
