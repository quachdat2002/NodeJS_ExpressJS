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
                    async function(err,data,fields) {
                        //khi có dữ liệu bản ghi username rồi thì chấm tới password 
                        console.log('data',data[0].password);
                        db.closeDB(connection);
                        //hàm so sánh password trong mysql với password từ client gửi lên
                        const kiemtraPws = await bcrypt.compare(password, data[0].password, function(err, result) {
                            if(kiemtraPws) {
                                const token = generateJWT({
                                    username: username,
                                });
                                return res.status(200).json('Login thành công');
                            }
                                
                            else
                                return res.status(200).json('login thất bại');
                        });
                    }
                )
            })
    }
    //hàm promise để đợi module testPromise làm việc xong thì mới in ra thông báo cho client
    promise(req,res) {
        // console.log('data',data);
        
        const key = require('crypto').randomBytes(256).toString('hex');
        console.log('secret key',key);
    }
    //hàm promises 
    promises(req,res) {
        let allData= 'chưa có';

        const promise1 = db.testPromise('#1',3000);
        const promise2 = db.testPromise('#2',2000);

        Promise.all([promise1,promise2]).then((result) => {
            //result[0] is result of promise 1
            //result[2] is result of promise 2

            console.log(result);
            return res.status(200).json(allData);
        }, (error) => {
            console.log(error);
            return res.status(200).json(error);
        });

        // console.log('allData',allData);
        // return res.status(200).json(allData);
    }
    //nhận username từ client để tạo token
    async fakeLogin(req, res) {
        const payload = {username: 'quachdat2002', id: 1};
        const token = generateJWT(payload);
        return res.status(200).json(token);
    }

    
}

function generateSecretKey(req,res) {
    // console.log('data',data);
    
    const key = require('crypto').randomBytes(256).toString('hex');
    console.log('secret key',key);

    return res.status(200).json(key);
}
//tạo Token mới cho thằng payload
function generateJWT(payload) {
    return JsonWebTokenError.sign(payload, process.env.TOKEN_SECRET,{ expiresIn: '120s'});
}

module.exports = new UserController();