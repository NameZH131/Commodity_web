//引入express模块
const express = require('express');
//创建路由器对象
const router = express.Router();


var showWelcome = false;
router.get('/', (req, res, next) => {
    if (req.session.user) {
        showWelcome = true;
    }
    //    响应页面
    res.render('aboutUs', { title: 'aboutUs', showModal: false, showWelcome: showWelcome });
})

module.exports = router;