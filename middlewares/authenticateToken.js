const jwt = require('jsonwebtoken');
//module sườn xác minh token của client 
const authenticateToken = (req,res,next) => {
    try {
        const token = req.header('Authorization');
        console.log('token',token);
        if (!token) return res.status(400).json({ msg: 'Chưa có JWT'});
        jwt.verify(token, process.env.TOKEN_SECRET, (err,user) => {
            //nếu token sai thì thông báo
            if (err) return res.status(400).json({ msg: 'JWT sai'});
            req.user = user;
            //nếu token đúng thì xài next() để chuyển qua trang mới
            next();
        });
    } catch (err) {
        return res.status(500).json({msg: 'Bị lỗi JWT'});
    }
};

module.exports = authenticateToken;