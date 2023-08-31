var express = require("express");
const { body } = require("express-validator");
const controller = require("../../controller/callcenter/booking/booking.controller");
var router = express.Router();
const middleware = require("../../middlewares");
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
router.get("/filter", middleware.isAuthenticated, controller.ListBookings);

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
 *                      $ref: '#/components/schemas/BookingRequest'
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
router.post("/create", middleware.isAuthenticated,
    [
        body("agent_id").trim().notEmpty().withMessage("agent_id is required"),
        body("driver_id").trim().notEmpty().withMessage("driver_id is required"),
        body("pickup_location").notEmpty().withMessage("pickup_location is required"),
        body("destination").trim().notEmpty().withMessage("destination is required"),
        body("time_completion").trim().notEmpty().withMessage("time_completion is required"),
        body("total_distance").trim().notEmpty().withMessage("total_distance is required"),

    ],
    controller.CreateBooking);
router.post("/create", middleware.isAuthenticated, controller.CreateBooking);
router.post("/accept", controller.acceptBooking);
router.post("/decline", controller.declineBooking);
router.post("/complete", controller.completeBooking);

module.exports = router;
