const driverdm = require('../models/user/driver/driver.dm')
const userdm = require("../models/user/user.dm");
const logger = require("../../common/logutil");

async function CreateNewUser(user) {
    try {
        const savedUser = await userdm.User.create(user);
        return savedUser._id;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function GetDriverById(id) {
    return await driverdm.GetDriverById(id)
}

async function GetDriverByUserId(id) {
    return await driverdm.DriverBanking()
}

module.exports = {}
