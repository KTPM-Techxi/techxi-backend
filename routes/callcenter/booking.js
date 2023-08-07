var express = require("express");
const { body } = require("express-validator");
const controller = require("../../controller/callcenter/booking/booking.controller");
var router = express.Router();
/**
 * @swagger
 * tags:
 *   name: CallCenter/Booking
 *   description: Booking endpoints
 */

/**
 * @swagger
 * /api/v1/callcenter/bookings/filter:
 *   get:
 *     summary: Get a list of bookings by filter
 *     tags: [CallCenter/Booking]
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
 *         description: Successful response with a list of bookings
 *         content:
 *           application/json:
 *              schema:   
 *                type: object
 *                properties:
 *                  bookings:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/BookingsResponse'
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
router.get("/filter", controller.ListBookings);

module.exports = router;
