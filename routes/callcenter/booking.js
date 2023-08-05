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
 * /api/v1/callcenter/filter:
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
 *             example:
 *               data:
 *                 - bookingId: 1
 *                   callCenterAgentsId: 1
 *                   customerId: 1
 *                   driverId: 1
 *                   pickupLocation: null
 *                   pickupLime: null
 *                   destination: null
 *                   time: null
 *                   scheduledTime: null
 *                   totalPrice: null
 *                   totalDistance: null
 *                   status: null
 *                   createdAt: null
 *                   updatedAt: null
 *                 - bookingId: 2
 *                   callCenterAgentsId: 2
 *                   customerId: 2
 *                   driverId: 2
 *                   pickupLocation:
 *                      -longtitude: 0
 *                      -latitude: 0
 *                   pickupLime: 24/07/2023 11:00:00
 *                   destination:
 *                      -longtitude: 0
 *                      -latitude: 0
 *                   timeCompletion: 30
 *                   scheduledTime: 24/07/2023 11:00:00
 *                   totalPrice: 1000
 *                   totalDistance: 10
 *                   status: 1
 *                   createdAt: 24/07/2023 11:00:00
 *                   updatedAt: 24/07/2023 11:00:00
 *               currentPage: 1
 *               totalPages: 5
 *               totalItems: 50
 */
router.get("/filter", controller.ListBookings);

module.exports = router;
