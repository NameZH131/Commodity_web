//引入express模块
const express = require('express');
//创建路由器对象
const router = express.Router();
//添加路由
//1.添加汽车
router.get('/', (req, res, next) => {
    //    判断是否登录
    // if (!req.session.user) {
    //     return res.status(401).json({ success: false, message: '用户未登录' });
    // }
    // 如果用户已登录，但用户信息不完整（例如缺少id属性），则设置默认id
    if (req.session.user && req.session.user.id === undefined) {
        req.session.user.id = null; // 或者你可以重定向到登录页面
    }
    // 响应页面
    res.render('car', { title: 'car', showModal: false, message: '', req: req });
})

module.exports = router;