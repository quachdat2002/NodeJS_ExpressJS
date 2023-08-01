const User = require('../models/user.model');
const people = require('../assets/people.json');
const fs = require('fs');
const db = require('../database.js');
//khai báo thư viện mã hóa
const bcrypt = require('bcrypt');
//thời gian mã hóa =10
const saltRounds = 10;


class UserController {
    get(req, res) {
        db.connectDB().then((connection) => {
            connection.query(
                `SELECT * FROM users`,
                function (err,data,fields) {
                    console.log('data',data);
                    db.closeDB(connection);
                    return res.status(200).json({data});
                }
            );
        })
        .catch((err) => {
            console.log('Db note connected successfully',err);
            return res.status(200).json({result: 'Không thể kết nối database'});
        });
    }

    post(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        
        let encryptedPassword = '';
        //kỹ thuật mã hóa password
        //saltRounds là thời gian mã hóa
        bcrypt.hash(password, saltRounds, function(err, hash) {
            //gán biến hash cho password đã mã hóa
            encryptedPassword = hash;
            console.log('encPass:', encryptedPassword);
                //hàm kết nối mysql
                db.connectDB().then((connection) => {
                    console.log('connected successfully!');
                    connection.query(
                        //lưu password đã mã hóa vào  mysql
                        `INSERT INTO users(username,password,email) VALUES ('${username}','${encryptedPassword}','')`,
                        function (err,data,fields) {
                            //in data vừa lấy đc ra màn hình terminal
                            console.log('data',data);
                            db.closeDB(connection);
                            //trả về thông báo cho client khi mà lưu vào mysql thành công
                            return res.status(200).json({result: 'Thành công'});
                        }
                    );
                })
                .catch((error) => {
                    console.log('Db not connected successfully',error);
                    return res.status(200).json({result: 'Không thể kết nối database'});
                });
        });
    }
    
    login(req,res) {
        const username = req.body.username;
        const password = req.body.password;

        db.connectDB()
            .then((connection) => {
                connection.query(
                    //truy vấn username trước 
                    `select *from users where username='${username}' limit 1`,
                    function(err,data,fields) {
                        //khi có dữ liệu bản ghi username rồi thì chấm tới password 
                        console.log('data',data[0].password);
                        db.closeDB(connection);
                        //hàm so sánh password trong mysql với password từ client gửi lên
                        bcrypt.compare(password, data[0].password, function(err, result) {
                            if(result)
                                return res.status(200).json('Login thành công');
                            else
                                return res.status(200).json('login thất bại');
                        });
                    }
                )
            })
    }
    //hàm promise để đợi module testPromise làm việc xong thì mới in ra thông báo cho client
    promise(req,res) {
        let data = 'chưa có data';
        //hàm này sẽ đợi 3s
        db.testPromise(3000).then((monan) => {
            console.log('món ăn 3000:',monan);
        }).catch((error) => {
            console.log('error',error)
        });
        //sau đó sẽ tới dòng này đợi 1s
        
        db.testPromise(1000).then((monan) => {
            console.log('món ăn 1000:',monan);
        }).catch((error) => {
            console.log('error',error)
        });

        // console.log('data',data);
        //dòng này sẽ in ra đầu tiên 
        return res.status(200).json(data);
    }
}

module.exports = new UserController();