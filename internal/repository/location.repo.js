const locationdm = require("../models/location/location.dm");
const driverdm = require("../models/user/driver/driver.dm");
const logger = require("../../common/logutil").GetLogger("location.repo.js");

async function CreateNewLocation(location) {
    try {
        const savedLocation = await locationdm.Location.create(location);

        return savedLocation._id;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function UpsertDriverLocation(driverId, location) {
    try {
        const savedLocation = await locationdm.Location.save({
            user_id: driverId,
            location: {
                coordinates: [location.latitude, location.longitude]
            },
            active: location.active
        });
        return savedLocation._id;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
module.exports = {
    CreateNewLocation,
    UpsertDriverLocation
};
