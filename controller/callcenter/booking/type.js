const filterReq = (req) => ({
    currentPageStr: req.current_page,
    pageSizeStr: req.page_size
});
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingsRequest:
 *       type: object
 *       properties:
 *         agent_id:
 *           type: string
 *           description: ID of the call center agent.
 *         customer_id:
 *           type: string
 *           description: ID of the customer.
 *         driver_id:
 *           type: string
 *           description: ID of the driver.
 *         pickup_location:
 *           type: object
 *           properties:
 *             longtitude:
 *               type: number
 *             latitude:
 *               type: number
 *           description: Pickup location coordinates.
 *         pickupLime:
 *           type: string
 *           description: Pickup time in TODO format.
 *         destination:
 *           type: object
 *           properties:
 *             longtitude:
 *               type: number
 *             latitude:
 *               type: number
 *           description: Destination coordinates.
 *         time_completion:
 *           type: number
 *           description: Time taken for completion in minutes.
 *         scheduled_time:
 *           type: string
 *           description: Scheduled time in format TODO format'.
 *         total_price:
 *           type: number
 *           description: Total price of the booking.
 *         total_distance:
 *           type: number
 *           description: Total distance of the booking.
 */
const BookingReq = (req) => ({
    callCenterAgentId: req.agent_id,
    driverId: req.driver_id,
    customerId: req.customer_id,
    pickupLime: req.pickup_time,
    pickupLocation: req.pickup_location,
    destination: req.destination,
    timeCompletion: req.time_completion,
    scheduledTime: req.scheduled_time,
    totalDistance: req.total_distance,
    totalPrice: req.total_price
});

module.exports = {
    filterReq,
    BookingReq
};
