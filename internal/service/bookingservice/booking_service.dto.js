const FilterReqDto = (req) => ({
    currentPage: req.currentPage,
    pageSize: req.pageSize
});

const BookingReqDto = (req, agentId, driverId, customerId) => ({
    callCenterAgentsId: agentId,
    driverId: driverId,
    customerId: customerId,
    pickupTime: req.pickupTime,
    pickupLocation: {
        latitude: req.pickupLocation.latitude,
        longitude: req.pickupLocation.longitude
    },
    destination: {
        latitude: req.destination.latitude,
        longitude: req.destination.longitude
    },
    timeCompletion: req.timeCompletion,
    scheduledTime: req.scheduledTime,
    totalPrice: req.totalPrice,
    totalDistance: req.totalDistance
});

const BookingDto = (req) => ({
    bookingId: req._id,
    callCenterAgentsId: req.call_center_agents_id,
    customerId: req.customer_id,
    driverId: req.driver_id,
    pickupLocation: req.pickup_location,
    pickupTime: req.pickup_time,
    destination: req.destination,
    timeCompletion: req.time,
    scheduledTime: req.scheduled_time,
    totalPrice: req.total_price,
    totalDistance: req.total,
    status: req.status,
    createdAt: req.created_at,
    updatedAt: req.updated_at
});
const BookingDetailsDto = (booking, driver, customer, agent) => ({
    bookingId: booking._id,
    callCenterAgent: agent,
    customer: customer,
    driver: driver,
    pickupLocation: booking.pickup_location,
    pickupTime: booking.pickup_time,
    destination: booking.destination,
    timeCompletion: booking.time,
    scheduledTime: booking.scheduled_time,
    totalPrice: booking.total_price,
    totalDistance: booking.total,
    status: booking.status,
    createdAt: booking.created_at,
    updatedAt: booking.updated_at
});
module.exports = { BookingDto, FilterReqDto, BookingReqDto, BookingDetailsDto };
