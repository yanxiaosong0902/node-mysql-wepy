const express = require('express');
const path = require('path');
const fs = require('fs');
//const favicon = require('serve-favicon');
const users = require('./routes/users.js');
const secret = require('./routes/secret.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.urlencoded());
app.get('/',(req,res) => {
    res.send('hello world');
});

app.use('/users',users);
app.use('/secret',secret);
var server = app.listen(3000,() => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})