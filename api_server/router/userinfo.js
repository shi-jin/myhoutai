const express = require('express')
const router = express.Router()

// 挂载路由

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
    // 导入需要的验证规则对象，解构出需要的属性对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

//1. 获取用户基本信息的路由
// 当客户端发起get请求，调用userinfo_handler里面的getUserInfo函数
router.get('/userinfo', userinfo_handler.getUserInfo)
    //2. 更新用户信息的路由，调用expressJoi中间件传入验证规则对象
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
    //3. 更新密码的路由，1.请求地址， 2.调用中间件传入对象   ，3.对应的处理函数
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
    //4. 更换头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router