// dbConfig.js
module.exports = {
    host: 'localhost',
    port: 3306,  
    user: 'root',
    password: '',
    database: 'huali_web',
    max: 10,                   // 连接池中的最大连接数
    idleTimeoutMillis: 5000,   // 连接在被关闭前可以保持空闲状态的最大时间
};

// module.exports = {
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: '123',
//     database: 'huali_web',
//     max: 10,                   // 连接池中的最大连接数
//     idleTimeoutMillis: 5000,   // 连接在被关闭前可以保持空闲状态的最大时间
// };