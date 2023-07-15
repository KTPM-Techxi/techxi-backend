var express = require('express');
const loginController = require('../controller/User/login.controller');
const registerController = require('../controller/User/register.controller');
var router = express.Router();
/* GET users listing. */
// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// });

router.post('/login', loginController);
router.post('/register', registerController);
module.exports = router;
