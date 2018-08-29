const path = require('path')
const express = require('express')


// 控制路由
router = express.Router();

const listFile = require(path.join(__dirname,'../controllers/accountstudentmanager.js'))

// 这里需要的是一个对象
router.get('/list',listFile.getlistfile)












// 把路由导出去
module.exports = router