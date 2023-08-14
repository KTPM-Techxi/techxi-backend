var express = require("express");
const location = require("../../controller/callcenter/location/location.controller");
const { body } = require("express-validator");
var router = express.Router();

router.post(
    "/create",
    [
        body("phoneNumber", "address", "coordinate").notEmpty().withMessage("Invalid input"),        
       ],
    location.createLocationController
);

module.exports = router;
