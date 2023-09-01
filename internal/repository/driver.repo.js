const driverdm = require('../models/user/driver/driver.dm')
const userdm = require("../models/user/user.dm");
const logger = require("../../common/logutil");

async function GetDriverById(id) {
    try {
        const info = await userdm.User.findById(id);
        const vehicle = await driverdm.DriverVehicles.findOne({ user_id: id });
        return {
            info: info,
            vehicle: vehicle
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    GetDriverById
}
