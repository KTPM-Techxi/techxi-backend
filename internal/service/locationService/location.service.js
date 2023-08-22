const repo = require("../../repository/location.repo");

const logger = require("../../../common/logutil/logutil").GetLogger("LOCATION_SERVICE");
const { StatusCodes } = require("http-status-codes");
const locationdm = require("../../models/location/location.dm");
const plugins = require("../../../plugins/map");
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
module.exports = { CreateLocation };
