const pool = require('./sqlPool'); // 引入数据库连接池模块
// 封装一个查询数据库的函数
// query: 要执行的SQL语句
// params: SQL语句中的参数[]
// 返回一个Promise对象，resolve函数返回查询结果，reject函数返回错误信息
const queryDatabase = (query, params) => {
    console.log('执行 SQL:(', query, ')---参数:(', params, ')'); // 添加日志记录
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                console.error('SQL 执行出错:', error); // 添加错误日志记录
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = queryDatabase;



// queryDatabase.js
// const queryDatabase = (query, params) => {
//     console.log('执行 SQL:', query, ' --- 参数:', params);
//     return new Promise((resolve, reject) => {
//         pool.connect((err, client, release) => {
//             if (err) {
//                 console.error('连接数据库失败:', err);
//                 return reject(err);
//             }

//             // 替换 MySQL 参数绑定语法 `?` 为 PostgreSQL 的 `$1`, `$2`, `$3`, ...
//             const postgreSQLQuery = query.replace(/\?/g, (match, offset) => {
//                 if (params[offset] === undefined) {
//                     console.error('参数未定义:', offset);
//                     return reject(new Error('参数未定义'));
//                 }
//                 return `$${offset + 1}`;
//             });

//             client.query(postgreSQLQuery, params, (error, results) => {
//                 release(); // 释放连接
//                 if (error) {
//                     console.error('SQL 执行出错:', error);
//                     return reject(error);
//                 }
//                 resolve(results.rows); // 只返回结果集
//             });
//         });
//     });
// };

// module.exports = queryDatabase;
