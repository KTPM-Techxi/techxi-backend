const DriverVehicleDto = (driver) => ({
    driverLocationId: driver._id,
    driverId: driver.user_id,
    location: driver.location,
    vehicleNumber: driver.vehicle_number,
    vehicleName: driver.vehicle_name,
    vehicleType: driver.vehicle_type,
    active: driver.active
});

module.exports = { DriverVehicleDto };
