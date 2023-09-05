var express = require("express");
const middlewares = require("../../middlewares");
const { body } = require("express-validator");
const controller = require("../../controller/driver/location.controller");
var router = express.Router();

router.post("/location", middlewares.isAuthenticated, controller.HandleDriverLocation);

module.exports = router;
