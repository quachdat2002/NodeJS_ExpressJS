const express = require('express');
const router= express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', userController.get);
router.post('/', userController.post);
router.post('/login', userController.login);
router.get('/promise', userController.promise);
//trước khi vào promises thì phải đi qua thằng soát vé authenticateToken
router.get('/promises',authenticateToken, userController.promises);
router.get('/fakeLogin' ,userController.fakeLogin);

// authenticateToken là thằng soát vé.
module.exports = router;