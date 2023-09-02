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
    pickupTime: req.pickup_time,
    pickupLocation: {
        latitude: req.pickup_location.latitude,
        longtitude: req.pickup_location.longtitude
    },
    destination: {
        latitude: req.destination.latitude,
        longtitude: req.destination.longtitude
    },
    timeCompletion: req.time_completion,
    scheduledTime: req.scheduled_time,
    totalDistance: req.total_distance,
    totalPrice: req.total_price
});
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the booking.
 *         agent:
 *           type: object
 *           description: The name of the call center agent associated with the booking.
 *         customer:
 *           type: object
 *           description: The name of the customer who made the booking.
 *         driver:
 *           type: object
 *           description: The name of the driver assigned to the booking.
 *         pickup_location:
 *           type: string
 *           description: The pickup location for the booking.
 *         pickup_time:
 *           type: string
 *           description: The pickup time for the booking.
 *         destination:
 *           type: string
 *           description: The destination of the booking.
 *         time:
 *           type: string
 *           description: The time of completion for the booking.
 *         scheduled_time:
 *           type: string
 *           description: The scheduled time for the booking.
 *         total_price:
 *           type: number
 *           description: The total price of the booking.
 *         total:
 *           type: number
 *           description: The total distance of the booking.
 *         status:
 *           type: string
 *           description: The status of the booking.
 *         created_at:
 *           type: string
 *           description: The date and time when the booking was created.
 *         updated_at:
 *           type: string
 *           description: The date and time when the booking was last updated.
 */

const BookingResponse = (dto) => ({
    id: dto.bookingId,
    agent: dto.callCenterAgent,
    customer: dto.customer,
    driver: dto.driver,
    pickup_location: dto.pickupLocation,
    pickup_time: dto.pickupTime,
    destination: dto.destination,
    time: dto.timeCompletion,
    scheduled_time: dto.scheduledTime,
    total_price: dto.totalPrice,
    total: dto.totalDistance,
    status: dto.status,
    created_at: dto.createdAt,
    updated_at: dto.updatedAt
});
module.exports = {
    filterReq,
    BookingReq,
    BookingResponse
};
