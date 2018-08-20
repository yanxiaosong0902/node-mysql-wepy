const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/DBconfig');
const userSql = require('../db/usersql');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool(dbConfig.mysql);
//响应一个json
const responseJSON = (res,ret) => {
    if(typeof ret === 'undefined'){
        res.json({
            code:'-200',
            msg:'操作失败！'
        })
    }else{
        res.json(ret)
    }
};
//添加用户
router.get('/addUser',(req,res,next) => {
    pool.getConnection((err,connection) => {
        const param = req.query || req.param;
        connection.query(userSql.insert,[param.name,param.age],(err,result) => {
            if(result){
                result = {
                    code:'200',
                    msg:'增加成功！'
                }
            }
            responseJSON(res,result);
            //释放连接池
            connection.release();
        });
    });
});
router.get('/deleteUser',(req,res,next) => {
    pool.getConnection((err,connection) => {
        const param = req.query || req.params;
        connection.query(userSql.delete,[param.id],(err,result) => {
            if (result) {
                result = {
                    code: '200',
                    msg: '删除成功！'
                }
            }
            responseJSON(res,result);
            connection.release();
        })
    })
});
router.get('/',(req,res) => {
    res.send('users page');
});
router.post('/showUser',(req,res,next) => {
    pool.getConnection((err,connection) => {
        const params = req.body;
        connection.query(userSql.queryAll,[params.id],(err,result) => {
            if(result){
                result = {
                    code:'200',
                    msg:'获取成功！',
                    data:result
                }
            }
            responseJSON(res,result);
            connection.release();
        })
    })
})
module.exports = router;