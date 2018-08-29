//连接数据库

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name 数据库名字
const dbName = 'qianduan';


// 需要暴露findList的方法 xxx(集合名称，参数对象,回调)
// 集合就是数据库
exports.findList = (studentInfo,data,callback)=>{
    console.log(studentInfo);
    
    
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        
        //  db对象  
        const db = client.db(dbName);
       

        // 拿到集合
        // const studentInfo = client.db(studentInfo);
        const studentInfos = db.collection(studentInfo);

        //去查询数据
        studentInfos.find(data).toArray((err,doc)=>{

            callback(err,doc)
        })
        
       
      });

    //利用回调函数把结果返回给控制器


    
}

