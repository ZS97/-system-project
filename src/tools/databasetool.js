// 工具类 专门去操作数据库
//连接数据库
const MongoClient = require('mongodb').MongoClient;

// 需要把通过:id 获取到的数据导出去
const ObjectId = require('mongodb').ObjectId

exports.ObjectId = ObjectId

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name 数据库名字
const dbName = 'qianduan';

// studentmassage/list后台管理页面封装
// 需要暴露findList的方法 xxx(集合名称，参数对象,回调)
// 集合就是数据库

/*
* studentInfo  集合名称(数据库名)
* data (参数对象)
* callback (回调)
*/

// 抽取数据库操作的代码
// const getCommon = (req,res)=>{

// }


exports.findList = (studentInfo, data, callback) => {
    console.log(studentInfo);


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {

        //  db对象  
        const db = client.db(dbName);


        // 拿到集合
        // const studentInfo = client.db(studentInfo);
        const studentInfos = db.collection(studentInfo);

        //去查询数据 查询到的是所有的数据
        studentInfos.find(data).toArray((err, doc) => {

            callback(err, doc)
        })


    });

    //利用回调函数把结果返回给控制器
}



// 注册页面xxx(集合名称，参数对象,回调)
// exports.findOne = (accountInfo,data,callback)=>{
//     MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//         //拿到数据操作的db对象
//         const db = client.db(dbName);
//         // Get the documents collection 拿到集合 后面是数据库表名
//         const collection = db.collection('accountInfo');

//         // 现根据用户名查询 doc文档查询一条需要的是一个对象
//         collection.findOne({ username: req.body.username }, function (err, doc) {
//             // 查询完后需要关闭连接
//             client.close();
//             callback(err,doc);
//         });
//     });
// }

// 登录页面
exports.findOne = (accountInfo, data, callback) => {
    // 需要去数据库校验 
    // 测试的时候如果后面使用了加盐那么你就不能再输入数据库里面存的是明文
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        // 拿到集合
        const db = client.db(dbName);

        // Get the documents collection 拿到要操作的集合(数据库)
        const collection = db.collection(accountInfo);
        collection.findOne(data, (err, doc) => {
            // 如果返回的空的话那么就修改状态 
            client.close()
            callback(err, doc)
            //执行函数传递参数 callback
        })

    })

}

// 插入数据 
exports.insertOne = (accountInfo, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        // 拿到集合
        const db = client.db(dbName);

        // Get the documents collection 拿到要操作的集合(数据库名)
        const collection = db.collection(accountInfo);
        collection.insertOne(data, (err, result) => {
            // 如果返回的空的话那么就修改状态 
            client.close()
            callback(err, result)
        })

    })
}

// 删除
exports.deleteOne = (accountInfo,data,callback)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        // 拿到集合
        const db = client.db(dbName);

        // Get the documents collection 拿到要操作的集合(数据库名)
        const collection = db.collection(accountInfo);
        collection.deleteOne(data,(err,result)=>{
            client.close()
            callback(err,result)
        })

    })

}


// updateOne 修改编辑页面
exports.updateOne = (accountInfo, data, callback) => {
    // 需要去数据库校验 
    // 测试的时候如果后面使用了加盐那么你就不能再输入数据库里面存的是明文
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        // 拿到集合
        const db = client.db(dbName);

        // Get the documents collection 拿到要操作的集合(数据库)
        const collection = db.collection(accountInfo);
        collection.updateOne({ $set: params }, (err, doc) => {
            // 如果返回的空的话那么就修改状态 
            client.close()
            callback(err, doc)
            //执行函数传递参数 callback
        })

    })

}


// 封装方法

