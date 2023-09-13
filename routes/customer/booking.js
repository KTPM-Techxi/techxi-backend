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
/**
 * @swagger
 * /api/v1/customer/bookings/rating:
 *   post:
 *     summary: Rate a driver for a completed booking.
 *     tags:[Customer/Booking]
 *     description: Rate a driver and provide feedback for a completed booking.
 *     requestBody:
 *       description: Rating and feedback data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver_id:
 *                 type: string
 *                 description: The ID of the driver being rated.
 *               message:
 *                 type: string
 *                 description: Feedback message for the driver.
 *               rating:
 *                 type: number
 *                 description: The rating value given to the driver (e.g., 1 to 5).
 *             example:
 *               driver_id: "123456"
 *               message: "Great service!"
 *               rating: 5
 *     responses:
 *       200:
 *         description: Driver rated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: object
 *                   description: The rating object created.
 *             example:
 *               rating: { id: 1, customer_id: "67890", driver_id: "123456", message: "Great service!", rate: 5 }
 */
router.post("/rating", middlewares.isAuthenticated, controller.RatingBooking);
module.exports = router;
