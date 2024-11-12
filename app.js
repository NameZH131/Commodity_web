var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


//引入路由模块Router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flowerAdvisePageRouter = require('./routes/flowerAdvisePage');
var myFavoriteRouter = require('./routes/myFavorite');
var carRouter = require('./routes/car');
var aboutUsRouter = require('./routes/aboutUs');
var goodsDetailRouter = require('./routes/goodsDetail');
var userSafeSettingRouter = require('./routes/userSafeSetting');
var indexSpringImageRouter = require('./routes/indexSpringImage');
var userInformationSettingRouter = require('./routes/userInformationSetting');
var userSafeSettingRouter = require('./routes/userSafeSetting');


//model
var loginRouter = require('./modle/login');
var registerRouter = require('./modle/register');
var logOutRouter = require('./modle/logOut');
var userInformationSettingServerRouter = require('./modle/userInformationSettingServer');
var userSafeSettingServerRouter = require('./modle/userSafeSettingServer');
var updateCarRouter = require('./modle/updateCar');
var addToCarRouter = require('./modle/addToCar');

var app = express();

// view engine setup模板引擎设置
var ejs = require('ejs');
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.set('views', './views')


// Express中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用 express.json() 中间件来解析 JSON 请求体
app.use(express.json());
// 配置会话

// 设置 session
app.use(session({
  secret: 'your-secret-key', // 用于签名 session ID 的密钥
  resave: false, // 强制保存未修改的 session
  saveUninitialized: true, // 强制保存未初始化的 session
  cookie: { secure: false } // 如果你的应用在 HTTPS 下运行，请设置为 true
}));

//使用路由中间件,定义路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logOut', logOutRouter);
app.use('/userInformationSettingServer', userInformationSettingServerRouter);
app.use('/userSafeSettingServer', userSafeSettingServerRouter);
app.use('/updateCar', updateCarRouter);
app.use('/addToCar', addToCarRouter);



app.use('/flowerAdvisePage', flowerAdvisePageRouter)
app.use('/myFavorite', myFavoriteRouter)
app.use('/car', carRouter)
app.use('/aboutUs', aboutUsRouter)
app.use('/goodsDetail', goodsDetailRouter)
app.use('/userSafeSetting', userSafeSettingRouter)
app.use('/indexSpringImage', indexSpringImageRouter)
app.use('/userInformationSetting', userInformationSettingRouter)
app.use('/userSafeSetting', userSafeSettingRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page提交错误页面
  res.status(err.status || 500);
  res.render('error');
});



// //测试数据库连接
// const queryDatabase = require('./modle/queryDatabase');

// // 测试连接
// queryDatabase('SELECT 1 + 1 AS solution', (err, results, fields) => {
//   if (err) {
//     console.error('数据库连接失败:', err);
//     return;
//   }
//   console.log('数据库连接成功');
// });

const prisma = require('./modle/prismaClient'); // 引入Prisma客户端实例
//测试Prisma客户端
prisma.$queryRaw`SELECT 1 + 1 AS solution`
 .then((result) => {
    console.log('Prisma客户端连接成功:', result);
  })
 .catch((error) => {
    console.error('Prisma客户端连接失败:', error);
  });

//导出app
module.exports = app;
