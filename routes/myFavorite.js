//引入express模块
var express = require('express');
//创建路由器对象
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('myFavorite', { title: 'myFavorite', showModal: false, message: '', req: req });
});


module.exports = router;
