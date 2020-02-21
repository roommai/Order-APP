const express = require('express')
const router = express.Router();
const pool = require("../pool");

router.use('/carousel',(req,res) => {
    pool.query("select img_url from member_carousel", (err,result) =>{
        if (err) throw err;
        if (result.length > 0) {
          res.send({ code: 1, result });
        } else {
          res.send({ code: -1 });
        }
    })
})

module.exports = router