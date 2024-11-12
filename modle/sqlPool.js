const mysql = require('mysql');
// const postgres = require('pg');
const dbConfig = require('../dbConfig');


const pool = mysql.createPool(dbConfig);
// const pool = new postgres.Pool(dbConfig);  

module.exports = pool;