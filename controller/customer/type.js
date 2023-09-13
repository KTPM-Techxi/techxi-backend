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
