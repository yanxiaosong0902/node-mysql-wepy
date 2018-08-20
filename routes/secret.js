const express = require('express');
const secret = express.Router();
const request = require('request');
const responseJSON = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败！'
        })
    } else {
        res.json(ret)
    }
};
secret.post('/v1/api/cryptdata',(req,res) => {
    let WXBizDataCrypt = require('../common/WXBizDataCrypt');
    const sha1 = require('sha-1');
    try {
        let appId = 'wxbb980d00e531edc6';
        let secret = '7be10729edc77a199fcfbd87b6033cf0';
        let {encryptedData , iv , js_code , rawData , signature } = req.body;
        //获取session_key
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`;
        request(url,(err,response,body) => {
            if (!err && response.statusCode == 200) {
                 // Show the HTML for the baidu homepage.
                 let _body = JSON.parse(body);
                 let { session_key , openid } = _body;
                 if(!session_key){
                     return res.json('');
                 }

                let signature2 = sha1(rawData + session_key);
                if(signature != signature2){
                    return res.json('数据签名校验失败！')
                }
                let wxb = new WXBizDataCrypt(appId,session_key);
                let data = wxb.decryptData(encryptedData,iv);
                const ret = {
                    code: '200',
                    msg: '操作成功！',
                    data:data
                }
                responseJSON(res,ret);

            }else{
                return res.json('')
            }
        })
    } catch (error) {
        console.log(error);
    }

})


// var appId = 'wx4f4bc4dec97d474b'
// var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
// var encryptedData =
//     'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
//     'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
//     '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
//     '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
//     'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
//     'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
//     '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
//     'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
//     '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
//     '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
//     'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
//     '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
//     '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
//     'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
//     'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
//     '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
//     'Db/XcxxmK01EpqOyuxINew=='
// var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

// var pc = new WXBizDataCrypt(appId, sessionKey)

// var data = pc.decryptData(encryptedData, iv)

// console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
module.exports = secret;
