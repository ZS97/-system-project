const path = require('path')


// 这里是处理数据库里面的内容
// 这里到处是通过对象点语法  =是赋值
//控制器处理 找到html页面返回给业务处理逻辑
module.getRouterPage = (req,res)=>{
    const loginPath = require(path.join(__dirname,'../statics/views/login.html'))
    res.send(loginPath)
    

    //把路径返回给业务逻辑处理
    
}


// 把登录页面跟注册页面返回给浏览器

