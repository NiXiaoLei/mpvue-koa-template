const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config')
// const { pool } = require('../mysql')
// const { requestGner } = require('../util')
// const { tokenSecret } = require('../config')



const get = (ctx, next)=>{
  
  ctx.body = 2132123
}


const post = (ctx, next) =>{
  const { body } = ctx.request
  console.log('213213')
  let token = ctx.headers.authorization
  ctx.body = {msg: '请求成功', state: ctx.state, token: jwt.verify(token.split(' ')[1], tokenSecret)}   
}


module.exports = {
  get,
  post
}