var express = require("express");
const middlewares = require("../../middlewares");
const { body } = require("express-validator");
const controller = require("../../controller/customer/booking.controller");
var router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Customer/Booking
 *   description: Booking endpoints
 */

/**
 * @swagger
 * /api/v1/customer/bookings/request:
 *   post:
 *     summary: Create a new booking request.
 *     tags: [Customer/Booking]
 *     description: Create a new booking request for a customer.
 *     requestBody:
 *       description: Booking request data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingReq'
 *     responses:
 *       200:
 *         description: Booking request created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: string
 *                   description: The ID of the created booking request.
 *               example:
 *                 bookingId: "123456"
 */
router.post("/request", middlewares.isAuthenticated, controller.CreateBookingRequest);

module.exports = router;
