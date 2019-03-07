const express = require('express');
const router = express.Router();
const checkAuth = require("../middleWare/check-auth");
const UserController = require('../controllers/user');

router.post('/login', UserController.User_Login); 

router.post('/signup', UserController.user_signUp);
router.delete('/:userId',checkAuth , UserController.User_delete);

module.exports = router;
