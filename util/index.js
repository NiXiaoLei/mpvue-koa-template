const request = require('request');
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config')
const { appid, secret } = require('../config')
const { SQL_QUERY } = require('../mysql')


// 创建token
const tokenCreate = (info={}, expiresIn='1h') =>{
  return jwt.sign(info, tokenSecret, {expiresIn})
}


//  获取带参的url,去请求微信服务器
const getWxLoginUrl = (code='')=>{
  return `https://api.weixin.qq.com/sns/jscode2session?appid=${ appid }&secret=${ secret }&js_code=${ code }&grant_type=authorization_code`
}


// 深拷贝
const deepCopy = obj=>{
  return JSON.parse(JSON.stringify(obj))
}

// Node 发送请求
const requestGner = (url) => {
  return new Promise((resolved, rejected)=>{
    request(url, function (error, response, body) {
      if(error) {
        rejected(error)
      }else{
        resolved(body)
      }
    })
  })  
}



// jwt 验证错误的提示信息
const errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: {status: 202, msg: '身份验证失败'},
      };
    } else {
      throw err;
    }
  });
}


const jwtCreat = () =>{
  
}



module.exports = {
  tokenCreate,
  deepCopy,
  requestGner,
  errorHandle,
  getWxLoginUrl,
  SQL_QUERY
}