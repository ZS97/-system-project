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

app.use(express.static(path.join(__dirname)))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())



// Use the session middleware
app.use(session({ secret: 'keyboard cat', resave: true,saveUninitialized:false, cookie: { maxAge: 600000 }}))

// // *是支持所有get/post请求 要写在集成路由之前
// app.all('/*', (req, res, next) => {
//     // 如果请求行路径包含account就放行 没有再判断有没有req.session.loginName 如果包含就放行,如果不包含就跳到登录页面
//     if (req.url.includes('account')) {
//         next()
//     } else {
//         if (req.session.loginName) {
//             next()
//         } else (res.send('<script>alert("您还没有登录,请重新登录");location.href="/account/login"</script>'))
//     }
// })

//all 是代表支持GET/POST方法，这个all方法要写在集成路由之前
// app.all('/*',(req,res,next)=>{
//     if(req.url.includes('account')){
//         next()
//     }else{
//         // 判断是否登录，如果登录，放行，如果没有登录直接响应数据回去
//         if(req.session.loginName){
//             next()
//         }else{ // 没有登录，则响应浏览器一段可以执行的脚本
//             res.send(`<script>alert("您还没有登录，请先登录!");location.href="/account/login"</script>`)
//         }
//     }
// })


//通过路径 集成路由
const newFile = require(path.join(__dirname, "./routers/accountRouter.js"))

// 一级路径 交给哪个路由处理
app.use('/account', newFile)


// 通过路径 集成路由 打通路径 获取后台管理系统
const studentFile = require(path.join(__dirname, './routers/studentmanager.js'))

app.use('/studentmassage', studentFile)




// 开启web服务
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)

    } else {
        console.log('start ok')

    }
})