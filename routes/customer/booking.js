var express = require("express");
const middlewares = require("../../middlewares");
const { body } = require("express-validator");
const controller = require("../../controller/customer/booking.controller");
var router = express.Router();

router.post("/request", middlewares.isAuthenticated, controller.CreateBookingRequest);

module.exports = router;
