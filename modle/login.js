const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const prisma = require('./prismaClient'); // 引入Prisma客户端实例

// 登录处理 POST 请求
router.post('/', async (req, res) => {
    const { id, password } = req.body;
    const userId= parseInt(id);
    
    // 输入验证
    if (!id || !password) {
        res.render('login', { title: 'login', message: '账号或密码不能为空', showModal: true, req: req, showWelcome: false });
    }

    try {
        // 查询用户信息
        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        // 用户不存在
        if (!user) {
            console.log('用户不存在');
            res.render('index', { title: 'login', message: '用户不存在', showModal: true, req: req, showWelcome: false });
        }

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('密码错误');
            res.render('index', { title: 'login', message: '账号或密码错误', showModal: true, req: req, showWelcome: false });
        }
        // 登录成功，存储用户信息到会话
        req.session.user = {
            id: user.id,
            username: user.username, // 数据库中有username字段
        };

        // 查询用户的购物车商品
        const carGoods = await prisma.cars.findMany({
            where: { user_id: user.id }
        });
        console.log('查询用户的购物车商品', carGoods);
        // 将购物车商品存放到session中
        req.session.carGoods = carGoods;
        // 登录成功，可以进行会话管理
        res.render('index', {
            title: 'login',
            message: '登录成功',
            showModal: false,
            req: req,
            carGoods: req.session.carGoods, // 传递购物车商品数组
            showWelcome: true
        });
    } catch (error) {
        console.error('数据库错误:', error);
        res.render('index', { title: 'login', message: '服务器错误', showModal: true, req: req, showWelcome: false });
    }
});

module.exports = router;
[]