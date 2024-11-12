var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function (req, res, next) {

    res.render('userSafeSetting', { title: 'userSetting', req: req, message: `` });
})
module.exports = router;
