const Koa = require('koa');
const path = require('path');
const jwtKoa = require('koa-jwt')
const bodyParser = require('koa-bodyparser');
const apiRouter = require('./router')
// 初始化koa
const app = new Koa();
const { errorHandle } = require(path.join(__dirname, '/util'))
const { tokenSecret } = require(path.join(__dirname, '/config'))
global.Promise = require('bluebird')



//   koa-jwt
// const secret = 'jwt demo'
app.use(errorHandle)
app.use(jwtKoa({ secret: tokenSecret }).unless({
        path: [/^\/api\/login/] //数组中的路径不需要通过jwt验证
    }))


app.use(bodyParser());
app.use(apiRouter.routes());
// app.use(router.allowedMethods()); 
app.listen(3000)




