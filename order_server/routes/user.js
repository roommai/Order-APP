const express = require('express');
const md5 = require("md5");
const router = express.Router();
const pool = require("../pool");
const jwt=require("../jwt.js");

//post登陆|注册
router.post('/signin', (req,res)=>{
    var { phone, upwd } = req.body;
    //先查询用户是否存在，如不存在则查创建
    var sql = "SELECT phone FROM user WHERE phone = ?";
    pool.query(sql,[phone],(err,result)=>{
        //查询手机号是否注册
        var user = {};//定义对象保存用户的信息
        user.phone = phone; //保存用户手机号
        if (err) throw err;
        if(result.length == 0) {
            //如果未注册，执行注册
            var uname = "USER" + (Math.round(Math.random() * 8999) + 1000); //随机用户名
            user.uname = uname;//保存用户名
            user.sex = 1; //新注册的用户性别默认为1
            user.real_name = null; //新注册的用户真实姓名为空
            user.salary = null; //新注册的用户薪资收入为空
            user.birthday = null; //新注册的用户生日默认为空
            user.email = null; //新注册的用户的邮箱默认为空
            user.say = null; //新注册的用户的个性签名默认为空
            user.user_img = "/images/user/noname.jpg";
            user.city = "";

            user.vip_money = 0; //新注册的用户的捞币默认为0
            user.vip_value = 0; //新注册的用户的成长值默认为空

            var reg = "INSERT INTO user(phone,upwd,uname) VALUES(?,md5(?),?)";
            pool.query(reg, [phone,upwd,uname],(err,result) => {
                if(err) throw err;
                if(result.affectedRows > 0) {
                    // 注册vip
                    user.uid = result.insertId;
                    res.send({code:2,msg:"register successfully",user,token:jwt.generateToken(result[0])})
                    
                }else{
                    res.send({code: -2, msg:"registration failed"}) //注册失败
                }
            })
        }else if (result.length > 0){
            //如果号码已注册，尝试登陆
            var sql =
        "SELECT id,phone,uname,sex,real_name,salary,birthday,email,say,user_img,city FROM user WHERE phone = ? AND upwd = md5(?)";
            pool.query(sql,[phone,upwd], (err,result) => {
                if (err) throw err;
                if ( result.length > 0) {
                    user.uid = result[0].id;
                    user.uname = result[0].uname;
                    user.sex = result[0].sex;
                    user.real_name = result[0].real_name;
                    user.salary = result[0].salary;
                    user.birthday = result[0].birthday;
                    user.email = result[0].email;
                    user.say = result[0].say;
                    user.user_img = result[0].user_img;
                    user.city = result[0].city;
                    res.send({ code: 1, msg: "login successfully", user,token:jwt.generateToken(result[0]) }); //登录成功
                }else {
                    res.send({ code: -1, msg: "login failed" }); //登录失败
                  }
            } )
        }
    })
})


//更新vuex
router.get("/Checkuser", (req, res) => {
    // if (!req.session.uid) {
    //   res.send({ code: -7, msg: "not log in" });
    //   return;
    // }
    var user = {};
    // var uid = req.session.uid;
    var sql =
      "SELECT id,phone,uname,sex,real_name,salary,birthday,email,say,user_img,city FROM user WHERE id = ?";
  
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        user.uid = result[0].id;
        user.uname = result[0].uname;
        user.sex = result[0].sex;
        user.real_name = result[0].real_name;
        user.salary = result[0].salary;
        user.birthday = result[0].birthday;
        user.email = result[0].email;
        user.say = result[0].say;
        user.user_img = result[0].user_img;
        user.city = result[0].city;
          res.send({ code: 7, user });
          
      }
    });
  });
module.exports = router;