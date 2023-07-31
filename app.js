const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());

//website
app.use(express.static('client'));

//đường dẫn từ api /users 
app.use(apiPath + 'users', require('./routes/users.route'));
//khi nào gọi api mà có /upload sẽ đưa quyền điều khiển cho thằng upload.route.js
app.use(apiPath + 'upload', require('./routes/upload.route'));
const server = app.listen(port, function () {
    const host = 'localhost';
    const port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port)
})