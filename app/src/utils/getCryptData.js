const getCryptData_login = function(content){
    let code = '';
    const _this = content;
    return _this.login().then( data => {
        code = data.code;
        return _this.getUserInfo();
    }).then( data => {
        let { encryptedData, iv, js_code, rawData, signature ,userInfo } = data;
        let obj = {
            userInfo:userInfo,
            js_code:code,
            encryptedData:encryptedData,
            iv:iv,
            rawData:rawData,
            signature:signature
        };
        return Promise.resolve(obj);
    }).catch( e => {
        console.log(e);
        return Promise.reject(e);
    })
};
const getCryptData = function (params,content,http_url){
    const _this = content;
    const opt = {
        url: http_url + '/secret/v1/api/cryptdata',
    };
    const _params = JSON.stringify(params);
    const url = http_url + '/secret/v1/api/cryptdata';
    return _this.request({
            url:url, 
            data:_params, 
            method:'post'
    });
};

export { getCryptData , getCryptData_login}