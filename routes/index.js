const express = require('express');
const router = express.Router();

const prisma = require('../modle/prismaClient')

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    // 使用Prisma查询商品数据
    const goods = await prisma.goods.findMany({
      orderBy:{
        id: 'asc'
      }
    });
    req.session.goods = goods; // 将商品数据存入session
    req.session.carGoods = req.session.carGoods || []; // 初始化购物车商品数组

    // 渲染index页面，并传递商品数据
    res.render('index', {
      title: '主页',
      showModal: false,
      message: '',
      req: req,
      carGoods: req.session.carGoods, // 传递购物车商品数组
      showWelcome: req.session.user ? true : false
    });
  } catch (err) {
    // 如果查询出错，传递给错误处理器
    return next(err);
  }
});

module.exports = router;
