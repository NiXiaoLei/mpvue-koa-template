const { tokenCreate, requestGner, SQL_QUERY, getWxLoginUrl } = require('../util')


// 登录post  获取openid
 const post = async (ctx, next)=>{
    const { body } = ctx.request
    const { code, userInfo } = body 
    const { nickName } = userInfo
    // 请求微信服务器
    let getWxOpenId = await requestGner(getWxLoginUrl(code))
    // openid 转json
    getWxOpenId = JSON.parse(getWxOpenId)
    // 获取id
    let user = await SELECT_USER(getWxOpenId.openid)
    user = user[0]
    let id = ''

    // 判断数据库是否已存在该用户
    if(user == undefined){
      let { insertId } = await INSERT_USER({...getWxOpenId, ...userInfo})
      id = insertId
    }else{
      await UPDATE_USER({...getWxOpenId, ...userInfo})
      id = user.id
      console.log("更新成功")
    }

    const token = tokenCreate({id, nickName})
    ctx.body = { status: 200, msg:'登录成功' , token}
      
 }




 





// 登录get
const get =  async (ctx, next)=>{
  const token = jwt.sign({user: '倪晓磊'}, tokenSecret, {expiresIn: '1h'});
  ctx.body= {name: '21231321', code: 888, token}
}

module.exports = {
  get,
  post
}







//  --------------------sqlCreater---------------------------

// 查询用户id
const SELECT_USER = async (openid)=>{
  return await SQL_QUERY( `select id,nickName from users where \`openid\`=?`, [openid])
}

// 添加用户
const INSERT_USER = async ({nickName, avatarUrl, openid, session_key, gender, country, province, city, language })=>{
  return await SQL_QUERY(
    `INSERT INTO users (nickName, avatarUrl, openid, session_key, gender, country, province, city, language) VALUES (?,?,?,?,?,?,?,?,?)`, 
    [ nickName, avatarUrl, openid, session_key, gender, country, province, city, language ])
}

// 更新用户信息
const UPDATE_USER = async ({nickName, avatarUrl, openid, session_key, gender, country, province, city, language })=>{
  return await SQL_QUERY(`UPDATE users SET \`nickName\`=?, \`avatarUrl\`=?, \`openid\`=?,\`session_key\`=?, 
    \`gender\`=?, \`country\`=?, \`province\`=?, \`city\`=?, \`language\`=?  WHERE \`openid\` = ?`, 
    [ nickName, avatarUrl, openid, session_key, gender, country, province, city, language, openid ])
}

