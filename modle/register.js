const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('./prismaClient'); // 引入Prisma客户端实例

// 密码正则表达式
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// 注册处理 POST 请求
router.post('/', async (req, res) => {
    const { newId, newPassword } = req.body;

    // 输入验证
    if (!newId || !newPassword) {
        return res.render('index', { title: '注册', message: '账号和密码不能为空', showModal: true, req: req, showWelcome: false });
    }

    // 密码正则验证
    if (!passwordRegex.test(newPassword)) {
        return res.render('index', { title: '注册', message: '密码格式不正确，至少包含一个大写字母、一个小写字母、一个数字和一个特殊字符，长度至少为8个字符', showModal: true, req: req, showWelcome: false });
    }

    try {
        // 检查用户是否已存在
        const existingUser = await prisma.users.findUnique({
            where: { id: newId },
        });
        if (existingUser) {
            return res.render('index', {
                title: '注册', message: '用户名已存在', showModal: true, req: req, carGoods: req.session.carGoods, // 传递购物车商品数组
                showWelcome: false
            });
        }

        // 加密密码
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 创建新用户
        const newUser = await prisma.users.create({
            data: {
                id: newId,
                password: hashedPassword,
                created_at: new Date(),
            },
        });

        return res.render('index', {
            title: '注册',
            message: '注册成功',
            showModal: true,
            req: req,
            carGoods: req.session.carGoods, // 传递购物车商品数组
            showWelcome: false
        });
    } catch (error) {
        console.error('数据库错误:', error);
        return res.render('index', {
            title: '注册',
            message: '服务器错误',
            showModal: true,
            req: req,
            carGoods: req.session.carGoods, // 传递购物车商品数组
            showWelcome: false
        });
    }
});

module.exports = router;
