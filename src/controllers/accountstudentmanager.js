const path = require('path')

exports.getlistfile = (req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/list.html'))

}

// 数据库用户信息studentInfo
