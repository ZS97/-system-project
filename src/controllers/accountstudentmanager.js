const path = require('path')
const xtpl = require('xtpl')
// 需要从databasetool拿到结果集
const databasetool = require(path.join(__dirname,'../tools/databasetool.js'))

// 通过关键字去数据库查询
// 需要导出 这里=是赋值
exports.getlistfile = (req,res)=>{
    // 需要通过请求体里面拿到keyword 查询的时候空就是查询所有
    const keyword = req.query.keyword || '';
    // console.log(keyword);
    // 调用databasetool.findList的方法,拿到数据,渲染列表页面,返回给浏览器
    //xxx(集合名称，参数对象,回调)
    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        // 用模板渲染
        xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
            // student 就是渲染的时候需要的名称
            student:docs,
            keyword

        },function(error,content){
            res.send(content)
            // 把结果通过回调 模板之间的连接用回调
        });
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
