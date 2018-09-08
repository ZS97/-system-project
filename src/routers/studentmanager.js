const path = require('path')
const express = require('express')


// 控制路由
const router = express.Router();

const listFile = require(path.join(__dirname,'../controllers/accountstudentmanager.js'))

// 获取列表页面
// 这里需要的是一个对象
router.get('/list',listFile.getlistfile)



// 获取新增页面
router.get('/add',listFile.addStudentpage)


// 完成新增页面
router.post('/add',listFile.addStudent)

// 获取编辑页面
router.get('/edit/:studentId',listFile.editPage)


// 修改编辑页面
router.post('/edit/:studentId',listFile.editUpdate)





// 删除类表 路径写错 还有就是跳转的页面名字写错了
router.get('/delete/:studentId',listFile.deleteList)




// 把路由导出去
module.exports = router