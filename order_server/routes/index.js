const express = require("express");
const router = express.Router();
const pool = require("../pool");

//获取首页商品数据
router.get("/product", (req, res) => {
    pool.query(
      "select description,price,img_url,sold from product_index",
      (err, result) => {
        if (err) throw err;
        res.send({ code: 1,  result });
      }
    );
});

//获取轮播图1
router.get("/carouselIndex1", (req, res) => {
  pool.query("select img_url from carousel_index1", (err, result) => {
    if (err) throw err;
    res.send({ code: 1, data: result });
  });
});

//获取轮播图2
router.get("/carouselIndex2", (req, res) => {
  pool.query("select img_url from carousel_index2", (err, result) => {
    if (err) throw err;
    res.send({ code: 1, data: result });
  });
});

//获取门店列表
router.get("/shops", (req, res) => {
  pool.query("select * from shops", (err, result) => {
    if (err) throw err;
    res.send({ code: 1, result });
  });
});


//模糊查找 帖子
router.get("/searchPosts", (req, res) => {
  pool.query(
    // select u_id,label,content,post_time,origin,likes,comments,images,uname,say,user_img from posts inner join user on user.id = posts.u_id limit 0,5
    `SELECT u_id,label,content,post_time,origin,likes,comments,images,uname,say,user_img from posts inner join user on content like '%${req.query.keyword}%' and user.id = posts.u_id limit 0,99`,
    (err, result) => {
      if (err) throw err;
      res.send({ code: 1, result });
    }
  );
});

//模糊查找 用户
router.get("/searchUser", (req, res) => {
  console.log(req.query.keyword)
  pool.query(
    `SELECT * FROM user WHERE uname like '%${req.query.keyword}%'`,
    (err, result) => {
      if (err) throw err;
      res.send({ code: 1, result });
    }
  );
});

module.exports = router;