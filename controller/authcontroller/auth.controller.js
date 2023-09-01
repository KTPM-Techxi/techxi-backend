const service = require("../../internal/service/authservice/auth.service");
const dto = require("../../internal/service/authservice/auth_service.dto");
const logger = require("../../common/logutil").GetLogger("AUTH_CONTROLLER");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const { WriteJsonResponseWithCode, WriteJsonResponse } = require("../../common/httputil");
const { validationResult } = require("express-validator");
const registerController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors.array());
        WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, errors.array());
        return;
    }
    const { name, phoneNumber, email, address, dob, password, role } = req.body;

    const dobDate = moment(dob).toDate();

    const newUserRequest = dto.UserRegisterDto({ email, phoneNumber, name, address, dobDate, password, dob, role });
    try {
        const id = await service.UserRegister(newUserRequest);
        WriteJsonResponse(res, { user_id: id });
        return;
    } catch (error) {
        WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors.array());
        WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, errors.array());
        return;
    }
    const { email, password } = req.body;

    try {
        const { userId, token } = await service.UserLogin(dto.UserLoginDto({ email, password }));
        res.cookie("token", token, { httpOnly: true });
        WriteJsonResponse(res, { user_id: userId });
        return;
    } catch (error) {
        WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
    }
};
const logOutController = async (req, res) => {
    res.cookie("token", "", { httpOnly: true });
    res.cookie("authenticated", 0, { httpOnly: true });
    WriteJsonResponseWithCode(res, StatusCodes.OK, 0, "logout ok");
};

module.exports = { loginController, logOutController, registerController };
