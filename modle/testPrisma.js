// 引入 Prisma 客户端
const { PrismaClient } = require('@prisma/client');
// var prisma = new PrismaClient().$extends(withAccelerate())

// // 创建 Prisma 客户端实例
const prisma = new PrismaClient();

// 定义一个异步函数来执行查询
async function main() {
    try {
        // 执行查询：获取所有用户
        // const users = await prisma.user.findMany();
        // 查询id为1的用户
        const users = await prisma.users.findUnique({
            where: { id: 1 },
        });
        const goods=await prisma.goods.findMany();
        console.log('查询到的商品列表:',goods)

        // 打印查询结果
        console.log('查询到的用户列表:', users);
    } catch (e) {
        // 如果发生错误，打印错误信息
        console.error('查询失败:', e);
        await prisma.$disconnect();
    } finally {
        // 断开数据库连接
        await prisma.$disconnect();
    }
}

// 调用 main 函数
main();
