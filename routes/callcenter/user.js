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
 * /api/v1/callcenter/users/filter:
 *   get:
 *     summary: Get a list of users
 *     tags: [CallCenter/Users]
 *     parameters:
 *       - in: query
 *         name: roles
 *         description: Array of user roles
 *         style: form
 *         schema:
 *           type: array
 *           items:
 *             type: string
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
 *                type: object
 *                properties:
 *                  users:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/UserInfoResponse'
 *                  currentPage:
 *                    type: integer
 *                    description: Current page number.
 *                  pageSize:
 *                    type: integer
 *                    description: Number of items per page.
 *                  totalItems:
 *                    type: integer
 *                    description: Total number of items.
 *                  total:
 *                    type: integer
 *                    description: Total number of pages.
 */
router.get("/filter", controller.ListUsersWithFilter);

/**
 * @swagger
 * /api/v1/callcenter/users/details:
 *   post:
 *     summary: Get user details.
 *     tags: [CallCenter/Users]
 *     requestBody:
 *       description: User details request data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userInfo:
 *                   type: object
 *                   description: User information.
 *                 banking:
 *                   type: object
 *                   description: Banking information (if applicable).
 *                 vehicles:
 *                   type: array
 *                   description: List of vehicles (for drivers).
 */
router.get("/details", controller.GetUserDetails);
module.exports = router;
