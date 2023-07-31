//gọi thư viện express
const express = require('express');
//gọi thư viện multer
const multer = require('multer');
//dùng trước upload
const storage = multer.diskStorage({
    //cb là callback
    destination: function (req,file,cb){
        //vô thư mục uploads 
        cb(null,'./uploads');
    },
    filename: function(req,file,cb) {
        console.log(file);
        //ghi vào file đó có tên là original name
        //cũng có thể tùy chỉnh file.originalname để khi gửi file lên thì có thể đổi tên 
        //hoặc biến hóa để ko bị trùng => kiểm soát file gửi lên, ko cho gửi bậy
        cb(null, file.originalname);
    }
})

//single('myfile') là có 1 file mang tên của thẻ input
const upload = multer({ storage: storage}).single('myfile');
const router= express.Router();
//gửi tập tin nhận từ client
//khi nhận được cái post thì ta sẽ nhận 3 tham số req,res,next
router.post('/', (req,res,next) => {
    //gọi lại biến upload ở trên 
    upload(req,res,function(err) {
        if(err) 
            //thông báo cho client khi server ko nhận đc file
            res.send(err);
        else 
            //thông báo lại cho client khi server đã nhận thành công tập tin
            res.send('Success, Image uploaded!');
    })
    //server nhận đc thì in ra chữ test ở trên terminal
    console.log('test');
    //trả về lại chi client chữ ok để thông báo cho người ta biết là server đã thấy
    return res.status(200).json('Ok');
});

module.exports = router;