const DriverDto = (driver) => ({
    driverLocationId: driver._id,
    userId: driver.user_id,
    location: {
        type: driver.location.type,
        coordinates: driver.location.coordinates
    },
    vehicleNumber: driver.vehicle_number,
    vehicleName: driver.vehicle_name,
    vehicleType: driver.vehicle_type,
    active: driver.active
});

module.exports = { DriverDto };
