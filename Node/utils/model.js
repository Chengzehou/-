
// 路由里面需要 操作数据库   
const mongoose = require("mongoose");
const Schema = mongoose.Schema;   // 构造函数  Schema
const user_schema = new Schema({   // 定义表结构 
    userid : String,
    password :String,
    phone:Number,
    username:String,
    jiguan:String,
    sex:String,
    age:Number,
    phone:String,
    idcard:String,
    department:String,
    address:String,
    time:Date,
    
});  

exports.User = mongoose.model("user",user_schema)  //表结构模型 英语复数   users


// 体温 表结构 
const tw_schema =  new Schema({
    userid:String, 
    tiwen:Number,
    time:String,
    toggle:Boolean,  // 大于 37.4     
});
exports.Tw = mongoose.model("tiwen",tw_schema) 


// 签到 表结构 
const qd_schema =  new Schema({
    userid:String, 
    timeaction:String,
    timelast:String,
    workhour:String,     
});
exports.Qd = mongoose.model("qiandao",qd_schema) 

// 建议  表结构 
const advise_schema =  new Schema({
    userid:String,  
    bumen:String,
    advice:String,
    time:String,
});
exports.Advise = mongoose.model("advise",advise_schema)  