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
                    user.uid = result.insertId;//保存注册的用户id
                    pool.query("INSERT INTO vip(u_id,vip_regtime) VALUES(?,CURRENT_TIMESTAMP)",[result.insertId],(err,result) => {
                        if(err) throw err;
                        user.vip_id = result.insertId; //保存注册的用户vip_id
                        if(result.affectedRows > 0) {
                            //查找将时间转化为 2019-5-12格式的
                            pool.query("SELECT date_format(vip_regTime,'%Y%m%d') FROM vip WHERE vip_id = ?",[user.vip_id],(err,result) => {
                                if (err) throw err;
                                if (result.length > 0) {
                                    vip_card = "86" +result[0]["date_format(vip_regTime,'%Y%m%d')"] + user.vip_id;
                                    user.vip_card = vip_card;
                                    res.send({code:2,msg:"register successfully",user,token:jwt.generateToken(user.uid)})
                                }
                            })
                        }else{
                            res.send({code: -2, msg:"registration failed"}) //注册失败
                        }
                    })                   
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
                    //找vip表所所有东西
                    pool.query("SELECT vip_area,date_format(vip_regTime,'%Y%m%d'),vip_id,vip_money,vip_value FROM vip WHERE u_id = ?",[user.uid],(err,result) => {
                        if (err) throw err;
                        user.vip_card = "" + result[0].vip_area +  result[0]["date_format(vip_regTime,'%Y%m%d')"] + result[0].vip_id;
                        user.vip_money = result[0].vip_money;
                        user.vip_value = result[0].vip_value;
                        res.send({ code: 1, msg: "login successfully", user,token:jwt.generateToken(user.uid) }); //登录成功
                    })
                }else {
                    res.send({ code: -1, msg: "login failed" }); //登录失败
                  }
            } )
        }
    })
})


//是否登录
router.get("/islogin", (req, res) => {
    var uid = req.session.uid;
    if (!uid) {
      res.send({ code: -5, msg: "未登录" });
      return;
    } else {
      res.send({ code: 5, msg: "已登录" });
    }
  });

// 找回密码
router.put("/forget", (req, res) => {
    var { phone, upwd } = req.body;
    var sql = "UPDATE user SET upwd = md5(?) WHERE phone = ?";
    pool.query(sql, [upwd, phone], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 3, msg: "update successful" });
      } else {
        res.send({ code: -3, msg: "update failed" });
      }
    });
  });
//   修改密码
  router.put("/updatePassword", (req, res) => {
    pool.query(
      "select upwd from user where id = ?",
      [req.uid],
      (err, result) => {
        if (result[0].upwd == md5(req.body.oldPwd)) {
          pool.query(
            "update user set upwd = md5(?) where id = ?",
            [req.body.newPwd, req.uid],
            (err, result) => {
              if (err) throw err;
              if (result.affectedRows > 0) {
                res.send({ code: 8, msg: "update successful" });
              } else {
                res.send({ code: -8, msg: "update failed" });
              }
            }
          );
        } else {
          res.send({ code: -9, msg: "password error" });
        }
      }
    );
  });

//更改个人信息
router.put("/update", (req, res) => {
    var obj = req.body;
    pool.query(
      "update user set ? where id = ?",
      [obj, req.uid],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 6, msg: "update successful" });
        } else {
          res.send({ code: -6, msg: "update failed" });
        }
      }
    );
});
  

//更新vuex
router.get("/Checkuser", (req, res) => {
    // if (!req.session.uid) {
    //   res.send({ code: -7, msg: "not log in" });
    //   return;
    // }
    var uid = req.uid;
    var user = {};
    // var uid = req.session.uid;
    var sql =
      "SELECT id,phone,uname,sex,real_name,salary,birthday,email,say,user_img,city FROM user WHERE id = ?";
  
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        user.uid = result[0].id;
        user.phone = result[0].phone;
        user.uname = result[0].uname;
        user.sex = result[0].sex;
        user.real_name = result[0].real_name;
        user.salary = result[0].salary;
        user.birthday = result[0].birthday;
        user.email = result[0].email;
        user.say = result[0].say;
        user.user_img = result[0].user_img;
        user.city = result[0].city;
        pool.query(
            "SELECT vip_area,date_format(vip_regTime,'%Y%m%d'),vip_id,vip_money,vip_value FROM vip WHERE u_id = ?",[uid],
            (err, result) => {
              if (err) throw err;  
              user.vip_card =
                "" +
                result[0].vip_area +
                result[0]["date_format(vip_regTime,'%Y%m%d')"] +
                result[0].vip_id;
              user.vip_money = result[0].vip_money;
              user.vip_value = result[0].vip_value;
    
              res.send({ code: 7, user });
            })         
      }
    });
  });
module.exports = router;