const express = require('express');
const router = express.Router();
const pool = require("../pool");


//获取最新帖子
router.get('/new',( req,res ) => {
    var pageNumber = Number(req.query.pageNumber);
    var pageSize = Number(req.query.pageSize);
    let sql = "select u_id,label,content,post_time,origin,likes,comments,images,uname,say,user_img from posts inner join user on user.id = posts.u_id order by posts.post_time limit ?,?"
    pool.query(sql,[pageNumber, pageSize],(err,result) => {
        if (err) throw err;
        if(result.length > 0) {
            res.send({ code: 1,data:result})
        }else {
            res.send({ code: -1, msg: "no more" });
          }
    })
})

//关注用户，需要用户ID和被关注者的ID
router.get("/follow", (req, res) => {
    var user = req.query.user;
    pool.query(
      "insert into follow values(null,?,?)",
      [req.uid, user],
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "follow successful" });
        } else {
          res.send({ code: -1, msg: "follow failed" });
        }
      }
    );
  });

  //获取“我”关注的用户的帖子
router.get("/myfollow", (req, res) => {
    pool.query(
      "SELECT u_id,label,content,post_time,origin,likes,comments,images,uname,say,user_img FROM posts INNER JOIN user ON posts.u_id=user.id AND u_id IN (SELECT be_followed FROM follow WHERE follow = ?) limit ?,?",
      [req.uid, Number(req.query.pageNumber), Number(req.query.pageSize)],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.send({ code: 1, result });
        } else {
          res.send({ code: -1, msg: "empty" });
        }
      }
    );
  });


//获取轮播图
router.get("/carousel", (req, res) => {
    pool.query("select img_url from community_carousel", (err, result) => {
      if (err) throw err;
      res.send({ code: 1, result });
    });
  });
  
module.exports = router;
