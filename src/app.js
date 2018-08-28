//导入express
const express = require('express')

// 创建app应用
const app = express()

// 

// 开启web服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
        
    }else {
        console.log('start ok');
        
    }
})