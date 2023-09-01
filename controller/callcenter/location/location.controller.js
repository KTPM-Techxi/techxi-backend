const service = require("../../../internal/service/locationService/location.service");

const dto = require("../../../internal/service/locationService/location_service.dto");

const logger = require("../../../common/logutil").GetLogger("AUTH_CONTROLLER");
const { StatusCodes } = require("http-status-codes");
const {WriteJsonResponseWithCode, WriteJsonResponse} = require("../../../common/httputil");
const { validationResult } = require("express-validator");

const createLocationController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors.array());
        WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, errors.array());
        return;
    }
    const { phoneNumber, address, coordinate } = req.body;

    const newLocationRequest = dto.LocationDto({ phoneNumber, address, coordinate });

    try {
        const id = await service.CreateLocation(newLocationRequest);

        WriteJsonResponse(res, { status: "Successful", location_id: id });
        return;
    } catch (error) {
        WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { createLocationController };
