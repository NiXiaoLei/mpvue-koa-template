const Router = require('koa-router')
// 路由配置
const controllers = require('../controllers')
const apiRouter = new Router({
  prefix: '/api'
});



// 登录请求
apiRouter
  // 登录
  .get('/login', controllers.login.get)
  .post('/login', controllers.login.post)

  // home
  .get('/home', controllers.home.get)
  .post('/home', controllers.home.post)


module.exports = apiRouter