// 导入定义验证规则的包
//const joi = require('@hapi/joi')
const joi = require('joi');

// 1.定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

// 2.定义表单用户信息 id, nickname, email 的验证规则
// integer()整数类型数组，不带小数点   required()必传参数
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()

// 定义验证 avatar 头像的验证规则  dataUri()验证base64字符串
const avatar = joi.string().dataUri().required()

//1.1 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}

//2.2 验证规则对象 - 更新用户基本信息，对客户端提交到表单的数据进行验证
exports.update_userinfo_schema = {
    // 需要对 req.body 里面的数据进行验证
    body: {
        id,
        nickname,
        // 表单数据与验证规则名称不同，不能简写
        email: user_email,
    },
}

// 3.3验证规则对象 - 更新密码   joi.ref('oldPwd'新密码必须等于旧密码，concat(password)前面的规则和这个规则合并
exports.update_password_schema = {
    body: {
        // password复用之前定义的
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

// 4.验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}