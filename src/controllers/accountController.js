//路径
const path = require('path')
// 导入图片模块
const captchapng = require('captchapng');
//找到databasetoll.js
const databasetoll = require(path.join(__dirname, '../tools/databasetool.js'))



// 这里是处理数据库里面的内容
// 这里到处是通过对象点语法  =是赋值
//控制器处理 找到html页面返回给业务处理逻辑
//记得导出是exports
// 把登录页面跟注册页面返回给浏览器
exports.getRouterPage = (req, res) => {

    res.sendFile(path.join(__dirname, '../statics/views/login.html'))
    //把路径返回给业务逻辑处理   
}


// 再把注册页面打通
exports.getregister = (req, res) => {
    //把路径返回
    res.sendFile(path.join(__dirname, '../statics/views/register.html'))

}

//注册页面
//最终处理，把用户名密码保存起来，并且返回结果给浏览器
exports.register = (req, res) => {
    // 首先给他判断是status是0,message是注册成功,后面如果是注册成功那么就会走这里
    const result = { status: 0, message: '注册成功' }
    databasetoll.findOne ("accountInfo",{ username: req.body.username },(err, doc)=> {
        if (doc) {
            //如果用户名已经存在，那就给用户提示说用户名存在，如果不存在，那么就注册并且给用户一个反馈
            
            
            //修改状态
            result.status = 1;
            result.message = "用户名已经存在";

            // 把结果返回给浏览器 返回的是一个对象所以需要用json
            res.json(result);
        } else {
            //用户名不存在
            //2.如果用户名不存在，则先要把我们的数据插入到数据库中，然后返回注册成功给浏览器
            //每次都需要关闭数据库


            // 如果响应等于空就改变status状态反之把result返回给浏览器
            databasetoll.insertOne("accountInfo",req.body,(err, result2) => {
                if (result2 == null) {
                    result.status = 2;
                    result.message = "注册失败"
                }
                res.json(result)
            }
            )

        }
    } ) 
}

// 图片处理
// exports.vcodeimgId = (req,res)=>{
//     const vcode = parseInt(Math.random()*9000+1000)

//     // 把刚刚随机生成的验证码,存储到session中
//     req.session.vcode = vcode
//     //parseInt(Math.random()*9000+1000)转为vcode
//     var p = new captchapng(80,30,vcode); // width,height,numeric captcha
//         p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
//         p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

//         var img = p.getBase64();
//         var imgbase64 = new Buffer(img,'base64');
//         res.writeHead(200, {
//             'Content-Type': 'image/png'
//         });
//         res.end(imgbase64);
// }

exports.vcodeimgId = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    // console.log(vcode);

    // 把刚刚随机生成的验证码，存储到session中
    req.session.vcode = vcode

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64);
};



//最终处理 , 登录处理
//如果vcode相等就让他跳转页面
//需要去数据库查询数据 看是否一致 如果不一致提示错误 如果一致就跳转到/studentmassage/list 后台管理页面
//登录页面去数据库查询一条数据判断是否有
exports.login = (req, res) => {
    // 需要判断相同才去数据库查
    //{ username, password, vcode }
    // 先设置默认值
    const result = { status: 0, message: "登录成功" }
    // 首先校验验证码 如果不等于就直接结束
    if (req.body.vcode != req.session.vcode) {
        // 修改状态跟信息记得要加是改谁,所以是对象
        result.status = 1;
        result.message = "验证码错误";
        res.json(result)
        return;
    }


    // 需要去数据库校验 
    // 测试的时候如果后面使用了加盐那么你就不能再输入数据库里面存的是明文
    databasetoll.findOne("accountInfo",{ username: req.body.username, password: req.body.password }, (err, doc) => {
        // 如果返回的空的话那么就修改状态 
        if (doc == null) {
            result.status = 2;
            result.message = "用户名或密码错误"
        }
        res.json(result)
    }
    )
}






