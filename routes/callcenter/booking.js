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
router.get("/filter", controller.ListBookings);

/**
 * @swagger
 * /api/v1/callcenter/bookings/create:
 *   post:
 *     summary: Create a new booking
 *     tags: [CallCenter/Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingRequest'
 *     responses:
 *       200:
 *         description: Successfully created a booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookingId:
 *                   type: string
 */
router.post("/create", middleware.isAuthenticated, controller.CreateBooking);
/**
 * @swagger
 * /api/v1/callcenter/bookings/details:
 *   get:
 *     summary: Get booking details by ID
 *     tags: [CallCenter/Booking]
 *     description: Retrieve booking details for a specific booking by its ID.
 *     parameters:
 *       - in: query
 *         name: bookingId
 *         required: true
 *         description: The ID of the booking to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with booking details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookingResponse'
 */
router.get("/details", middleware.isAuthenticated, controller.GetBookingDetails);

/**
 * @swagger
 * /api/v1/callcenter/bookings/find_drivers:
 *   get:
 *     summary: Tìm kiếm tài xế gần nhất từ vị trí hiện tại.
 *     tags: [CallCenter/Booking]
 *     description: Tìm kiếm và trả về danh sách các tài xế gần nhất dựa trên vị trí và loại phương tiện.
 *     parameters:
 *       - in: query
 *         name: longitude
 *         required: true
 *         description: Kinh độ của vị trí hiện tại.
 *         type: number
 *       - in: query
 *         name: latitude
 *         required: true
 *         description: Vĩ độ của vị trí hiện tại.
 *         type: number
 *       - in: query
 *         name: vehicle_type
 *         required: false
 *         description: Loại phương tiện CAR | MOTOBIKE.
 *         type: string
 *     responses:
 *       200:
 *         description: Danh sách các tài xế gần nhất.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: ID của tài xế.
 */
router.get("/find_drivers", middleware.isAuthenticated, controller.FindDriver);
router.post("/accept", controller.acceptBooking);
router.post("/decline", controller.declineBooking);
router.post("/complete", controller.completeBooking);
router.post("/driver_response", controller.DriverResponse);
module.exports = router;
