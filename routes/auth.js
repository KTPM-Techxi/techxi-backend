var express = require("express");
const auth = require("../controller/authcontroller/auth.controller");
const { body } = require("express-validator");
const userdm = require("../internal/models/user/user.dm");
var router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 user_id:
 *                   type: string
 */
router.post("/login", [body("email").isEmail().withMessage("Email not valid"), body("password").isLength({ min: 6 }).withMessage("Password not valid")], auth.loginController);
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               dob:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               role:
 *                 type: string
 *               required:
 *               - name
 *               - phoneNumber
 *               - email
 *               - address
 *               - dob
 *               - password
 *               - role
 *             example:
 *               name: John Doe
 *               phoneNumber: 1234567890
 *               address: 123 Main St
 *               dob: 1990-01-01
 *               email: user@example.com
 *               password: password123
 *               confirmPassword: password123
 *               role: customer
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 user_id:
 *                   type: string
 */
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
/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout success
 *       401:
 *         description: Unauthorized
 */
router.get("/logout", auth.logOutController);

module.exports = router;
