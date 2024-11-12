const express = require('express');
const router = express.Router();
const prisma = require('./prismaClient'); // 引入Prisma客户端实例

router.post('/', async (req, res) => {
    const cartData = req.body; // 获取购物车数据
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: '请先登录' });
    }

    const userId = req.session.user.id;

    if (!cartData || !Array.isArray(cartData)) {
        return res.status(400).json({ success: false, message: '购物车数据格式不正确' });
    }

    try {
        // 开启一个事务
        const transaction = await prisma.$transaction(async (prisma) => {
            // 获取当前购物车中所有商品
            const currentCartItems = await prisma.cars.findMany({
                where: { user_id: userId },
            });

            const currentCartGoodsMap = new Map(currentCartItems.map(item => [item.goods_id, item]));

            // 批量更新购物车商品
            for (const item of cartData) {
                const existingItem = currentCartGoodsMap.get(item.goods_id);
                if (existingItem) {
                    if (existingItem.quantity !== item.quantity || existingItem.selected !== item.selected) {
                        // 商品已存在，且数量或选中状态有变化，更新数量和选中状态
                        await prisma.cars.update({
                            where: { user_id_goods_id: { user_id: userId, goods_id: item.goods_id } },
                            data: {
                                quantity: item.quantity,
                                selected: item.selected,
                            },
                        });
                    }
                } else {
                    // 商品不存在，创建新的购物车项
                    await prisma.cars.create({
                        data: {
                            user_id: userId,
                            goods_id: item.goods_id,
                            quantity: item.quantity,
                            selected: item.selected,
                        },
                    });
                }
            }

            // 批量删除购物车中不存在的商品
            for (const [goodsId, value] of currentCartGoodsMap) {
                if (!cartData.some(item => item.goods_id === goodsId)) {
                    await prisma.cars.delete({
                        where: { user_id_goods_id: { user_id: userId, goods_id: goodsId } },
                    });
                }
            }
        });

        // 更新session中的购物车商品
        req.session.carGoods = cartData;

        res.json({ success: true, message: '购物车更新成功', carGoods: cartData });
    } catch (error) {
        console.error('购物车更新失败:', error);
        res.status(500).json({ success: false, message: '更新购物车失败' });
    }
});

module.exports = router;
