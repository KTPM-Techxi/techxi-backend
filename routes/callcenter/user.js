var express = require("express");
const { body } = require("express-validator");
const controller = require("../../controller/callcenter/user/user.controller");
var router = express.Router();
/**
 * @swagger
 * tags:
 *   name: CallCenter/Users
 *   description: Booking endpoints
 */

/**
 * @swagger
 * /api/v1/callcenter/users/list:
 *   get:
 *     summary: Get a list of users
 *     tags: [CallCenter/Users]
 *     parameters:
 *       - in: query
 *         name: current_page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Successful response with a list of us
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/UserInfoDto'
 */
router.get("/list", controller.ListCustomers);

module.exports = router;
