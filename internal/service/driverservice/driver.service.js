const repo = require("../../repository/driver.repo");
const dto = require("./driver_service.dto");
async function GetNearestDriversFromLocation(longitude, latitude, vehicleType, distance) {
    try {
        const driver = await repo.FindNearestDriversFromLocation(longitude, latitude, vehicleType, distance);
        if (!driver) {
            const error = new Error("Driver not found");
            logger.error(error);
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
        }
        const driverDto = dto.DriverDto(driver);
        return driverDto;
    } catch (error) {}
}

module.exports = { GetNearestDriversFromLocation };
