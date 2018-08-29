//这里是路由

//导入express
const express = require('express')
const path = require('path')

// 创建路由对象
const router = express.Router();

//通过路径 找到暴露出来的html页面 这里半天就是因为path.jion没写
// const accountControllerPath = require(path.join((__dirname, '../controllers/accountController.js')))
//这里是注册页面
const accountURL = require(path.join(__dirname, '../controllers/accountController.js'))


// 通过路径获取登录页面
router.get('/login', accountURL.getRouterPage)

// 二级路径,交给哪个路由器处理路由器知识找到那个文件夹,需要用到对象点方法
router.get('/register', accountURL.getregister)


// post请求验证数据库 密码不能传入到url里面
// 404报错 那么就是没找到这个路径
router.post('/register',accountURL.register)



// 获取图片验证码
router.get('/vcode',accountURL.vcodeimgId)


// 最重要的一步 忘记导出路由
module.exports = router