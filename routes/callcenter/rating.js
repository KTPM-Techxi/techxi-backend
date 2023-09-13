var express = require("express");
const controller = require("../../controller/callcenter/rating/rating.controller");
const { body } = require("express-validator");
var router = express.Router();

/**
 * @swagger
 * /api/v1/callcenter/rating/list:
 *   get:
 *     summary: List all ratings.
 *     tags: [CallCenter/Rating]
 *     description: Retrieve a list of all ratings.
 *     responses:
 *       200:
 *         description: List of ratings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rating_id:
 *                     type: string
 *                   customer_id:
 *                     type: string
 *                   driver_id:
 *                     type: string
 *                   message:
 *                     type: string
 *                   rating:
 *                     type: number
 *                 example:
 *                   rating_id: "1"
 *                   customer_id: "12345"
 *                   driver_id: "67890"
 *                   message: "Great service!"
 *                   rating: 5
 */
router.get("/list", controller.ListRating);

module.exports = router;
