const mysql = require('mysql');
require('dotenv').config();

module.exports.connectDB = () => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: process.env.DB_NAME || 'demo',
        });
        con.connect((err) => {
            if(err){
                reject(err);}
            else{
                resolve(con);}
        });
    });
};

module.exports.closeDB = (con) => {
    console.log('close db');
    con.destroy();
};
//giả lập nấu món phở trong vòng 5 giây
module.exports.testPromise = (name = '',ms = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Lời hứa ' + name + 'Sau khi tạm dừng '+ms+' ms, đã làm xong');
        },ms);
    });
};