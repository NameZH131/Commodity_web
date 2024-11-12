const express = require('express');
const router = express.Router();

// GET 商品详情路由处理函数
router.get('/:id', function (req, res, next) { // 这里正确地使用了 :id
    // 假设req.session.goods是从数据库加载的商品列表
    const goods = req.session.goods;
    console.log(goods);
    // 从请求参数中获取商品ID，并确保它是一个整数
    const goodsId = parseInt(req.params.id);
    console.log(goodsId);
    // 根据 goodsId 找到对应的商品详情
    const goodsDetail = goods.find(good => good.id === goodsId);

    // 检查是否找到了对应的商品详情
    if (!goodsDetail) {
        // 如果没有找到，返回错误响应
        return res.status(404).send('商品详情未找到');
    }

    // 如果找到了商品详情，渲染 goodsDetail 视图，并传递商品详情数据
    res.render('goodsDetail', { // 使用正确的视图名称
        title: '商品详情',
        product: goodsDetail, // 传递商品详情对象
        showModal: false,
        message: '',
        req: req,
        showWelcome: req.session.user ? true : false
    });
});

module.exports = router;
