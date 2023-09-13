var express = require("express");
const controller = require("../../controller/callcenter/rating/rating.controller");
const { body } = require("express-validator");
var router = express.Router();

router.post("/list", controller.ListRating);

module.exports = router;
