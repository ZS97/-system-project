//主要是集合路由

//导入express
const express = require('express')
const path = require('path')

// 使用post请求
//https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser')

//https://www.npmjs.com/package/express-session
const session = require('express-session')
// 创建app应用
const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

//通过路径 集成路由
const newFile = require(path.join(__dirname, "./routers/accountRouter.js"))

// 一级路径 交给哪个路由处理
app.use('/account', newFile)


// 通过路径 集成路由 打通路径
const studentFile = require(path.join(__dirname,'./routers/studentmanager.js'))

app.use('/account',studentFile)



// 开启web服务
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)

    } else {
        console.log('start ok')

    }
})