// 引入express模块
const express = require('express');
// 创建路由器对象
const prisma = require('../modle/prismaClient'); // 引入Prisma客户端实例
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        // 使用Prisma客户端查询用户信息
        const user = await prisma.users.findUnique({
            where: {
                id: req.session.user.id
            },
            select: {
                username: true,
                email: true,
                phone: true
            }
        });

        // 成功获取到用户信息，渲染页面
        res.render('userInformationSetting', {
            title: 'userInformationSetting',
            message: '你干嘛哎哟',
            req: req,
            user: user
        });
    } catch (error) {
        // 数据库查询失败，渲染页面并提示错误信息
        res.render('userInformationSetting', {
            title: 'userInformationSetting',
            message: '获取用户信息失败',
            req: req
        });
    }
});

module.exports = router;
