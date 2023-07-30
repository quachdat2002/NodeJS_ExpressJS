const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());

//website
app.use(express.static('client'));

//routes
app.use(apiPath + 'users', require('./routes/users.route'));

const server = app.listen(port, function () {
    const host = 'localhost';
    const port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port)
})