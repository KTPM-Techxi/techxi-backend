const filterReq = (req) => ({
    currentPageStr: req.current_page,
    pageSizeStr: req.page_size
});
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingRequest:
 *       type: object
 *       properties:
 *         driver_vehicle_type:
 *           type: string
 *         customer_name:
 *           type: string
 *         customer_phone_number:
 *           type: string
 *         pickup_time:
 *           type: string
 *         pickup_address:
 *           type: string
 *         pickup_location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         destination_address:
 *           type: string
 *         destination:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *         time_completion:
 *           type: string
 *         scheduled_time:
 *           type: string
 *         total_distance:
 *           type: number
 *         total_price:
 *           type: number
 */
const BookingReq = (req) => ({
    vehicleType: req.driver_vehicle_type,
    customerName: req.customer_name,
    customerPhoneNumber: req.customer_phone_number,
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
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         agent:
 *           type: object
 *         customer:
 *           type: object
 *         driver:
 *           type: object
 *         pickup_location:
 *           type: string
 *         pickup_time:
 *           type: string
 *         destination:
 *           type: string
 *         time:
 *           type: string
 *         scheduled_time:
 *           type: string
 *         total_price:
 *           type: number
 *         total:
 *           type: number
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
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
/**
 * @swagger
 * components:
 *   schemas:
 *     DriverBookingResp:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message or response from the driver.
 *         booking_id:
 *           type: string
 *           description: The ID of the associated booking.
 *         driver_id:
 *           type: string
 *           description: The ID of the driver.
 *       example:
 *         message: "Driver accepted the booking."
 *         booking_id: "123456"
 *         driver_id: "7890"
 */
const DriverBookingResp = (req) => ({
    message: req.message,
    bookingId: req.booking_id,
    driverId: req.driver_id
});

const ToCustomerBookingResp = (req) => ({
    message: req.message
});

const UpdateBookingReq = (req) => ({
    agentId: req.agent_id,
    customerId: req.customer_id,
    driverId: req.driver_id,
    vehicleType: req.driver_vehicle_type,
    timeCompletion: req.time_completion,
    scheduledTime: req.scheduled_time,
    totalDistance: req.total_distance,
    totalPrice: req.total_price
});
module.exports = {
    filterReq,
    BookingReq,
    BookingResponse,
    DriverBookingResp,
    ToCustomerBookingResp,
    UpdateBookingReq
};
