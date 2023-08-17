var express = require("express");
const { body } = require("express-validator");
const controller = require("../../controller/callcenter/user/user.controller");
var router = express.Router();
const middleware = require("../../middlewares");
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
router.get("/filter", middleware.isAuthenticated, controller.ListUsersWithFilter);
router.get("/details", controller.GetUserDetails);
module.exports = router;
