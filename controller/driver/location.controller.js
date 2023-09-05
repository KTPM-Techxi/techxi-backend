const service = require("../../internal/service/locationService/location.service");

const HandleDriverLocation = async (req, res) => {
    try {
        const location = req.body.location;
        const driverId = req.session.userId;
        const locationUpdate = service.UpsertDriverLocation(driverId, location);
        httputil.WriteJsonResponse(res, locationUpdate);
    } catch (error) {
        WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = {
    HandleDriverLocation
};
