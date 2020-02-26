const express = require("express");
const path = require('path');
const md5 = require("md5");
const bodyParser = require('body-parser')
const cors = require("cors")

//引入token的模块
const jwt=require("./jwt.js")
let app = express();
// 监听端口
app.listen(8080);

// 托管静态资源
app.use(express.static(path.join(__dirname,"products")));

// 配置跨域
app.use(
    cors({
        origin:[
            'http://localhost:8081','http://127.0.0.1:8081'
        ],
        // 每次请求验证
        credentials: true
    })
);
// 设置跨域访问
//设置跨域访问
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Credentials: true");
  next();
});

  
// 使用parser中间件
app.use( bodyParser.urlencoded({
    extended:false
}));

const userRouter=require("./routes/user.js");
const ComyRouter=require("./routes/community.js");
const MemberRouter=require("./routes/member.js");
const IndexRouter=require("./routes/index.js");

//中间件来验证发过来的token//拦截直接跳到相应的页面
    app.use(( req,res,next ) => {
        console.log("拦截成功")
    //     //当url以什么开头的时候的接口，才必须要token--个人中心，购物车

        if(req.url.startsWith("/users/Checkuser") || req.url.startsWith("/users/update") || req.url.startsWith("/community/follow")|| req.url.startsWith("/community/myfollow") || req.url.startsWith("/users/updatePassword")){

    //         //客户端通过请求头把token发过来
            let token = req.headers.token ;
    //         //把获得的token给解密方法返回结果
            let result = jwt.verifyToken(token);
    //         //如果通过就next,否则就返回登录信息不正确
            if(result===undefined){
                res.send({status:403,msg:"未提供证书"})
            }else if(result.name== 'TokenExpiredError'){//如果证书过期了
                res.send({status:403, msg: '登录超时，请重新登录'})
            }else if(result.name=='JsonWebTokenError'){//JSON字符串，万一多一位少一位，出错
                res.send({status:403,msg:'证书出错'})
            } else{
    //             //在中间件已经获得了对象，再执行到mypage的时候，已经带着对象过去了，所以要拿对象，在userRouter里拿
                req.uid=result;//拿到了对象
    //             //向下执行
                next();
            }

        }else{
            next()
        }
    })
// 挂在路由
app.use('/users',userRouter)
app.use('/index',IndexRouter)
app.use('/community',ComyRouter)
app.use('/member',MemberRouter)