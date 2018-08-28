//主要是集合路由

//导入express
const express = require('express')
const path = require('path')

// 创建app应用
const app = express()

//通过路径 集成路由
const newFile = require(path.join(__dirname,"./routers/accountRouter.js"))

// 一级路径 交给哪个路由处理
app.use('/account',newFile)

// 开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
        
    }else {
        console.log('start ok')
        
    }
})