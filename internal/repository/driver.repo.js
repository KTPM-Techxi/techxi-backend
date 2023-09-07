const driverdm = require("../models/user/driver/driver.dm");
const userdm = require("../models/user/user.dm");
const logger = require("../../common/logutil").GetLogger("driver.repo.js");
const util = require("../../common/util");
const appConst = require("../../common/constants");
async function GetDriverWithVerhicleById(id) {
    try {
        const info = await userdm.User.findById(id);
        const vehicle = await driverdm.DriverLocations.findOne({ user_id: id });
        return {
            info: info,
            vehicle: {
                vehicle_number,
                vehicle_name,
                vehicle_type
            }
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function FindNearestDriversFromLocation(latitude, longitude, vehicleType, distance) {
    try {
        const query = {
            location: {
                $near: {
                    $maxDistance: distance,
                    $geometry: { type: "Point", coordinates: [longitude, latitude] }
                }
            },
            vehicle_type: vehicleType,
            active: 1,
        };
        logger.info("query " + util.LogObject(query));
        const driver = await driverdm.DriverLocations.find(query).limit(1).exec();
        logger.info("driver " + driver);
        return driver[0];
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
module.exports = {
    GetDriverWithVerhicleById,
    FindNearestDriversFromLocation
};
