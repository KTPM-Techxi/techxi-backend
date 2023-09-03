const repo = require("../../repository/location.repo");
const userRepo = require("../../repository/user.repo");
const logger = require("../../../common/logutil").GetLogger("LOCATION_SERVICE");
const { StatusCodes } = require("http-status-codes");
const locationdm = require("../../models/location/location.dm");
const plugins = require("../../../plugins/map");
const driverDm = require("../../models/user/driver/driver.dm");
async function CreateLocation(locationReq) {
    logger.info("LocationDto: ", locationReq);

    try {
        const newLocation = new locationdm.Location({
            phoneNumber: locationReq.phoneNumber,
            address: locationReq.address,
            coordinate: locationReq.coordinate
        });
        const savedLocation = await repo.CreateNewLocation(newLocation);
        if (!savedLocation) {
            const error = new Error("Location not saved");
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }

        let id = savedLocation._id.toString();

        return locationData; // Return the created location
    } catch (error) {
        // await repo.DeleteUserByEmail(userRegisterDto.email);
        throw error; // Rethrow the error for the calling code to handle
    }
}

async function UpsertDriverLocation(driverId, location) {
    try {
        const driver = await userRepo.FindUserById(driverId);
        if (!driver.isFound) {
            if (!driverLocation) {
                const error = new Error("Not found driver " + driver);
                error.statusCode = StatusCodes.BAD_REQUEST;
                throw error;
            }
        }
        if (!Object.values(driverDm.STATUS).includes(location.active)) {
            const error = new Error("Invalid active status");
                error.statusCode = StatusCodes.BAD_REQUEST;
                throw error;
        }

        const driverLocation = await repo.UpsertDriverLocation(driverId, location);
        if (!driverLocation) {
            const error = new Error("Location not saved");
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
        return driverLocation
    } catch (error) {
        throw error
    }
}
module.exports = { CreateLocation, UpsertDriverLocation };
