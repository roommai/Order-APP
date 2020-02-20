//引入模块依赖
const fs = require("fs");
const path = require('path');
const jwt = require('jsonwebtoken');

//生成token
//将对象生成为特殊字符串
function generateToken(data){
    //获得当前创建token的时间
    let created = Math.floor(Date.now() / 1000); 
    //从硬盘上读取私钥准备加密
    let cert = fs.readFileSync(path.join(__dirname, './pem/rsa_private_key.pem')
    );//私钥 可以自己生成
    //调用jsonwebtoken的签名方法 sign
    let token = jwt.sign({
        data, //用户对象
        exp: created + 60*60,  //过期时间：一小时
    },cert,{algorithm:'RS256'})  //加密算法
    return token;
}

//校验token
//给一个token生成对象
function verifyToken(token){
    //从硬盘上读取公钥准备解密
    let cert = fs.readFileSync(path.join(__dirname,'./pem/rsa_public_key.pem'));//公钥 可以自己生成`
    let res;
    try {
        //如果token存在，给了他
        if(token!==undefined){
            // 编译结果
            let result = jwt.verify(token,cert,{algorithms:['RS256']}) || {};
            //返回结果为编译后的对象
            res = result.data || {};
        }

    } catch(e){//捕获错误
        //返回结果为错误
        res=e;
    }
    return res;
}

module.exports = {generateToken,verifyToken};