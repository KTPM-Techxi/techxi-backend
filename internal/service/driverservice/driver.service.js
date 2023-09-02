const repo = require("../../repository/driver.repo");
const dto = require("./driver_service.dto");
async function GetNearestDriversFromLocation(longitude, latitude, distance) {
    try {
        const drivers = await repo.FindNearestDriversFromLocation(longitude, latitude, distance);
        let driverIds = [];
        for (const driver of drivers) {
            driverIds.push(driver.user_id);
        }
        return driverIds;
    } catch (error) {}
}

module.exports = { GetNearestDriversFromLocation };
