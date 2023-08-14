const locationdm = require("../models/location/location.dm");

const logger = require("../../common/logutil/logutil").GetLogger("LOCATION_REPO");

async function CreateNewLocation(location) {
    try {
        const savedLocation = await locationdm.Location.create(location);

        return savedLocation._id;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    CreateNewLocation
};
