

var jwt = require("jsonwebtoken");

const secret = "CZWK";

// 加密
exports.createToken = function(data){  // data 需要加密的字段  
    return jwt.sign(data,secret);
}

// 解密 
const decodeToken = function(token){
    return new Promise(function(resolve,reject){
        jwt.verify(token,secret,function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data); 
            }
        })
    })
}