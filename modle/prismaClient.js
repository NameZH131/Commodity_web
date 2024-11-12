const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

console.log('Prisma client initialized');

// 输出执行的语句和执行时间
prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    console.log(`Query: ${params.action} took ${after - before}ms`);
    return result;
})


module.exports = prisma;
