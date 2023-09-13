var express = require("express");
const auth = require("../controller/authcontroller/auth.controller");
const { body } = require("express-validator");
const userdm = require("../internal/models/user/user.dm");
const user = require("../controller/callcenter/user/user.controller");
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
 *               vehicle:
 *                 type: object
 *                 vehicle_name: string
 *                 vehicle_type: string
 *                 vehicle_number: string
 *               required:
 *               - name
 *               - phoneNumber
 *               - email
 *               - address
 *               - dob
 *               - password
 *               - role
 *               - vehicle
 *             example:
 *               name: John Doe
 *               phoneNumber: 1234567890
 *               address: 123 Main St
 *               dob: 1990-01-01
 *               email: user@example.com
 *               password: password123
 *               confirmPassword: password123
 *               role: customer
 *               vehicle: {
 *                  vehicle_name: 'Vehicle',
 *                  vehicle_number: '123GV123',
 *                  vehicle_type: 'CAR'
 *               }
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
router.post("/register", [body("name", "phoneNumber", "address", "dob", "confirmPassword").notEmpty().withMessage("Invalid input"), body("email").isEmail().withMessage("Invalid Email"), body("password").isLength({ min: 6 }).withMessage("Invalid Password"), body("role").isIn([userdm.ROLE.CUSTOMER, userdm.ROLE.DRIVER, userdm.ROLE.CALL_CENTER_AGENT]).withMessage("Invalid Role")], auth.registerController);
/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout success
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", auth.logOutController);

router.post("/fcm", [body("user_id", "fcmToken").notEmpty().withMessage("Invalid input")], user.updateUserFCM);

module.exports = router;
