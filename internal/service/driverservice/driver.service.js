const repo = require("../../repository/driver.repo");
const bookingRepo = require("../../repository/booking.repo");
const userRepo = require("../../repository/user.repo");
const dto = require("./driver_service.dto");
const { BookingDto } = require("../bookingservice/booking_service.dto");
const logger = require("../../../common/logutil").GetLogger("driver.service.js");
const messager = require("../../../internal/service/fcm.service");
const { StatusCodes } = require("http-status-codes");
async function GetNearestDriversFromLocation(bookingId, distance) {
    try {
        const booking = await bookingRepo.FindBookingById(bookingId);
        const bookingDto = BookingDto(booking);

        const driverVehicle = await repo.FindNearestDriversFromLocation(bookingDto.latitude, bookingDto.longitude, bookingDto.vehicleType, distance);
        if (!driverVehicle) {
            const error = new Error("Driver not found");
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
        }
        const driverVehicleDto = dto.DriverVehicleDto(driverVehicle);

        const driver = await userRepo.FindUserById(driverVehicleDto.driverId);
        logger.info(JSON.stringify(driver.user.fcmToken, 0, 2));

        messager.fcmSendData(driver.user.fcmToken, {
            booking_id: bookingDto.bookingId,
            pickup_address: bookingDto.pickupAddress,
            destinationAddress: bookingDto.destinationAddress,
            distance: bookingDto.totalDistance,
            price: bookingDto.totalDistance
        });
        return driverVehicleDto;
    } catch (error) {
        throw error;
    }
}

module.exports = { GetNearestDriversFromLocation };
