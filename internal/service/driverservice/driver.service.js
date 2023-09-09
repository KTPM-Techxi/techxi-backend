const repo = require("../../repository/driver.repo");
const dto = require("./driver_service.dto");
const logger = require("../../../common/logutil").GetLogger("driver.service.js");
const { StatusCodes } = require("http-status-codes");
async function GetNearestDriversFromLocation(location, vehicleType, distance) {
    try {
        const driver = await repo.FindNearestDriversFromLocation(location.latitude, location.longitude, vehicleType, distance);
        if (!driver) {
            const error = new Error("Driver not found");
            logger.error(error);
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
        }
        const driverDto = dto.DriverDto(driver);
        logger.info(JSON.stringify(driverDto, 0, 2));
        return driverDto;
    } catch (error) {
        throw error;
    }
}

module.exports = { GetNearestDriversFromLocation };
