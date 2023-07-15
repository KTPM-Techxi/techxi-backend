var express = require('express');
const loginController = require('../controller/User/login.controller');
const registerController = require('../controller/User/register.controller');
const logOutController = require('../controller/User/logout.controller');
var router = express.Router();
/* GET users listing. */
// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// });

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/logout', logOutController);
module.exports = router;
