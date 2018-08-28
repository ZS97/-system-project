//这里是路由

//导入express
const express = require('express')
const path = require('path')

// 路由
const router = express.Router();

//通过路径 找到暴露出来的html页面
const accountControllerPath = require(__dirname,'../controllers/accountController.js')

// 通过路径获取登录页面
router.get('/login',accountControllerPath.getRouterPage)

// 最重要的一步 忘记导出路由
module.exports = router