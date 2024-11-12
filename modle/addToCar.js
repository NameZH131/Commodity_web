const express = require('express');
const router = express.Router();
const prisma = require('./prismaClient'); // 引入Prisma客户端实例

router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;
    // 检查用户是否登录
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: '用户未登录' });
    }
    const userId = req.session.user.id; // 用户已登录并且其ID存储在session中

    try {
        // 检查购物车中是否已经存在该商品
        const existingCartItem = await prisma.cars.findFirst({
            where: {
                user_id: userId,
                goods_id: productId,
            },
        });

        if (existingCartItem) {
            // 商品已存在，更新数量
            await prisma.cars.update({
                where: {
                    user_id_goods_id: { user_id: userId, goods_id: productId },
                },
                data: { quantity },
            });
            // 更新session中的购物车商品
            req.session.carGoods = await getCartGoods(userId);
            return res.json({ success: true, message: '购物车已更新' });
        } else {
            // 商品不存在，添加新记录
            await prisma.cars.create({
                data: {
                    user_id: userId,
                    goods_id: productId,
                    quantity,
                    selected: true,
                },
            });
            // 更新session中的购物车商品
            req.session.carGoods = await getCartGoods(userId);
            res.json({ success: true, message: '商品已添加到购物车', carGoods: req.session.carGoods });
        }
    } catch (err) {
        console.error('处理购物车时出错:', err);
        res.status(500).json({ success: false, message: '处理购物车时发生错误', error: err.message });
    }
});

// 获取用户购物车中的所有商品存入session中
async function getCartGoods(userId) {
    const cartItems = await prisma.cars.findMany({
        where: { user_id: userId },
    });
    return cartItems;
}

module.exports = router;
