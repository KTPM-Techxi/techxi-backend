/**
 * @swagger
 * components:
 *   schemas:
 *     BookingReq:
 *       type: object
 *       properties:
 *         driver_vehicle_type:
 *           type: string
 *           description: The type of the driver's vehicle.
 *         pickup_time:
 *           type: string
 *           description: The pickup time for the booking.
 *         pickup_address:
 *           type: string
 *           description: The pickup address for the booking.
 *         pickup_location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: The latitude of the pickup location.
 *             longitude:
 *               type: number
 *               description: The longitude of the pickup location.
 *           description: The pickup location coordinates.
 *         destination_address:
 *           type: string
 *           description: The destination address for the booking.
 *         destination:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: The latitude of the destination location.
 *             longitude:
 *               type: number
 *               description: The longitude of the destination location.
 *           description: The destination location coordinates.
 *         time_completion:
 *           type: string
 *           description: The time when the booking was completed.
 *         scheduled_time:
 *           type: string
 *           description: The scheduled time for the booking.
 *         total_distance:
 *           type: number
 *           description: The total distance of the booking.
 *         total_price:
 *           type: number
 *           description: The total price of the booking.
 */
const BookingReq = (req) => ({
    vehicleType: req.driver_vehicle_type,
    pickupTime: req.pickup_time,
    pickupAddress: req.pickup_address,
    pickupLocation: {
        latitude: req.pickup_location.latitude,
        longitude: req.pickup_location.longtitude
    },
    destinationAddress: req.destination_address,
    destination: {
        latitude: req.destination.latitude,
        longitude: req.destination.longtitude
    },
    timeCompletion: req.time_completion,
    scheduledTime: req.scheduled_time,
    totalDistance: req.total_distance,
    totalPrice: req.total_price
});

module.exports = { BookingReq };
