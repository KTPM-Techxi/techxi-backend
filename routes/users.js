var express = require("express");
const auth = require("../controller/authcontroller/auth.controller");
const { body } = require("express-validator");
const userdm = require("../internal/models/user/user.dm");
var router = express.Router();

router.post("/login", [body("email").isEmail().withMessage("Email not valid"), body("password").isLength({ min: 6 }).withMessage("Password not valid")], auth.loginController);
router.post(
    "/register",
    [
        body("name", "phoneNumber", "address", "dob", "confirmPassword").notEmpty().withMessage("Invalid input"),
        body("email").isEmail().withMessage("Invalid Email"),
        body("password").isLength({ min: 6 }).withMessage("Invalid Password"),
        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            })
            .withMessage("Passwords do not match"),
        body("role").isIn([userdm.ROLE.CUSTOMER, userdm.ROLE.DRIVER, userdm.ROLE.CALL_CENTER_AGENT]).withMessage("Invalid Role")
    ],
    auth.registerController
);
router.get("/logout", auth.logOutController);

module.exports = router;
