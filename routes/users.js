var express = require('express');
const auth = require('../controller/authcontroller/auth.controller');

var router = express.Router();
/* GET users listing. */
// router.get('/', function (req, res, next) {
// 	res.send('respond with a resource');
// });

router.post('/login', auth.loginController);
router.post('/register', auth.registerController);
router.post('/logout', auth.logOutController);
module.exports = router;
