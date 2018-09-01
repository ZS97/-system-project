const path = require('path')
const xtpl = require('xtpl')
// 需要从databasetool拿到结果集
const databasetool = require(path.join(__dirname, '../tools/databasetool.js'))

// 通过关键字去数据库查询
// 需要导出 这里=是赋值
exports.getlistfile = (req, res) => {
    // 需要通过请求体里面拿到keyword 查询的时候空就是查询所有
    const keyword = req.query.keyword || '';
    // console.log(keyword);
    // 调用databasetool.findList的方法,拿到数据,渲染列表页面,返回给浏览器
    //xxx(集合名称，参数对象,回调)
    databasetool.findList('studentInfo', { name: { $regex: keyword } }, (err, docs) => {
        // 用模板渲染
        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
            // student 就是渲染的时候需要的名称
            student: docs,
            keyword

        }, function (error, content) {
            res.send(content)
            // 把结果通过回调 模板之间的连接用回调
        });
    })

}
//抽取出来的这一部分就可以说是匿名函数的定义 接收到工具类传递过来的参数err,docs错误信息跟参数
// (err,docs)=>{
//     // 用模板渲染
//     xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
//         // student 就是渲染的时候需要的名称
//         student:docs,
//         keyword

//     },function(error,content){
//         res.send(content)
//         // 把结果通过回调 模板之间的连接用回调
//     });
// })

// 把新增页面返回出去
// 把输入的值传入到session中
exports.addStudentpage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, '../statics/views/add.html'), {
        // 设置session
        loginName: req.session.loginName


    }, function (error, content) {
        res.send(content)
    });

}

// 新增页面完成
exports.addStudent = (req, res) => {
    // 获取到input里面带name的值
    //点击保存的时候跳转到list.html页面
    //如果插入失败弹出新增失败
    // form 表单提交的时候会把带name值提交过去
    databasetool.insertOne('studentInfo', req.body, (err, reslut) => {
        if (reslut == null) {
            res.send('<script>alert("新增失败!")</script>')
        } else {
            res.send('<script>window.location.href="/studentmassage/list"</script>')
        }
    })
}

// 编辑页面 渲染 需要用到xtpl
// 
exports.editPage = (req, res) => {
    databasetool.findOne('studentInfo',{_id: databasetool.ObjectId(req.params.studentId)},(err,doc)=>{
        console.log(doc);
        
        xtpl.renderFile(path.join(__dirname,'../statics/views/edit.html'), {
            // 动态生成
            student:doc
        }, function (error, content) {
            res.end(content)
        });
    })
    
}


// 完成编辑是通过传递id 然后取updateOne 
exports.editUpdate = (req,res)=>{
    databasetool.updateOne('studentInfo',{_id: databasetool.ObjectId(req.params.studentId)},(err,doc)=>{
        xtpl.renderFile(path.join(__dirname,'../statics/views/edit.html'), {
            // 动态生成
            student:doc,
            loginName:req.session.loginName
        }, function (error, content) {
            res.end(content)
        });
    })
}


// 删除列表
exports.deleteList = (req, res) => {
    // 获取到id
    databasetool.deleteOne('studentInfo', { _id: databasetool.ObjectId(req.params.studentId) }, (err, reslut) => {
        console.log(req.params);

        if (reslut == null) {
            res.send('<script>alert("删除失败!")</script>')
        } else {
            res.send(`<script>window.location.href="/studentmassage/list"</script>`)
        }
    })
}




















// exports.getlistfile = (req, res) => {
//     //获取到传递过来的input里面的keyword 空的话是查询到所有
//     const keyword = req.query.keyword || '';

//     // 调用databasetool.findList的方法,拿到数据,渲染列表页面,返回给浏览器
//     //xxx(集合名称，参数对象,回调)
//     databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,doc)=>{
//         xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
//             // 一个是渲染模板需要用的参数还有一个是input默认值


//             student : doc,
//             keyword
//         },function(error,content){


//             // 把结果返回
//             res.send(content)
//         });
//     })

// }

// 数据库用户信息studentInfo
