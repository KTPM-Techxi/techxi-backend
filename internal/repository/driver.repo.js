const driverdm = require("../models/user/driver/driver.dm");
const userdm = require("../models/user/user.dm");
const logger = require("../../common/logutil");
const appConst = require("../../common/constants");
async function GetDriverWithVerhicleById(id) {
    try {
        const info = await userdm.User.findById(id);
        const vehicle = await driverdm.DriverVehicles.findOne({ user_id: id });
        return {
            info: info,
            vehicle: vehicle
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function FindNearestDriversFromLocation(latitude, longitude, distance, unit = "km") {
    const unitValue = unit == "km" ? 1000 : 1609.3;
    try {
        const query = {
            locations: {
                $near: {
                    $geometry: { type: "Point", coordinates: [latitude, longitude] },
                    $maxDistance: distance * unitValue
                }
            }
        };
        const drivers = await driverdm.DriverLocations.find(query).limit(5);
        return drivers;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
module.exports = {
    GetDriverWithVerhicleById,
    FindNearestDriversFromLocation
};
