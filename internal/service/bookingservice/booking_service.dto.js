const FilterReqDto = (req) => ({
    currentPage: req.currentPage,
    pageSize: req.pageSize
});

const BookingDto = (req) => ({
    bookingId: req._id,
    callCenterAgentsId: req.call_center_agents_id,
    customerId: req.customer_id,
    driverId: req.driver_id,
    pickupLocation: req.pickup_location,
    pickupLime: req.pickup_lime,
    destination: req.destination,
    time_completion: req.time,
    scheduledTime: req.scheduled_time,
    totalPrice: req.total_price,
    totalDistance: req.total,
    status: req.status,
    createdAt: req.created_at,
    updatedAt: req.updated_at
});

module.exports = { BookingDto, FilterReqDto, BookingReqDto };
