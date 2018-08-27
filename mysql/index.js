const mysql = require('mysql2');
// 使用bluebrid 代替promise
const bluebird = require('bluebird');

// 创建数据库连接
const poolCreator = mysql.createPool({host:'localhost', user: 'root', password:'', database: 'mydb',  Promise: bluebird});
const pool = poolCreator.promise();
// 创建连接池

const SQL_QUERY = async (sql='', formate=[]) =>{
  const [rows,fields] = await pool.query(sql, formate)
  return JSON.parse(JSON.stringify(rows))
}






module.exports = {
  SQL_QUERY
}