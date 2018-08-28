//路径
const path = require('path')

// 操作数据库
const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name 数据库名称
const dbName = 'dq21';



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

//注册
//最终处理，把用户名密码保存起来，并且返回结果给浏览器
exports.register = (req, res) => {
    // 首先给他判断是status是0,message是注册成功,后面如果是注册成功那么就会走这里
    const result = { status: 0, message: '注册成功' }
    // Use connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //拿到数据操作的db对象
        const db = client.db(dbName);
        // Get the documents collection 拿到集合 后面是数据库表名
        const collection = db.collection('accountInfo');

        // 现根据用户名查询 doc文档查询一条需要的是一个对象
        collection.findOne({ usename:req.body.username }, function(err, doc) {
           if(doc){
            //如果用户名已经存在，那就给用户提示说用户名存在，如果不存在，那么就注册并且给用户一个反馈
            //关掉数据库
            client.close()
            //修改状态
            result.status=1
            result.message = "用户名"

            // 把结果返回给浏览器 返回的是一个对象所以需要用json
            res.json(result)
           }else {
            //用户名不存在
            //2.如果用户名不存在，则先要把我们的数据插入到数据库中，然后返回注册成功给浏览器
            //每次都需要关闭数据库
            client.close()
            collection.insertOne(req.body,(req,result2)=>{
                console.log(req.body);
                // 如果响应等于空就改变status状态反之把result返回给浏览器
                if(result2 == null){
                    result.status = 2;
                    result.message = "注册失败"
                }
                res.json(result)
            })

           }
          });
    });
}





