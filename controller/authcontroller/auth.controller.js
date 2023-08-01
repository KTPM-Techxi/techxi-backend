const util = require("../../common/util/bcrypt.util");
const service = require("../../internal/service/userservice/user.service");
const dto = require("../../internal/service/userservice/user_service.dto");
const logger = require("../../common/logutil/logutil").GetLogger("AUTH_CONTROLLER");
const User = require("../../internal/models/auth/user_credential.dm");
const { StatusCodes } = require("http-status-codes");
const moment = require('moment');
const { UserLoginDto } = require("../../internal/service/userservice/user_service.dto");
const { WriteJsonResponseWithCode, WriteJsonResponse } = require("../../common/httputil/httputil");
const registerController = async (req, res) => {
    const { name, phoneNumber, email, address, dob, password, confirmPassword, roles } = req.body;
    if (!name || !phoneNumber || !isValidEmail(email) || !address || !dob || !password || !confirmPassword || !roles) {
        return WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, 'Please fill all required fields');
    }
    if (password.length < 6) {
        return WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, 'Password must be at least 6 characters');
    }
    if (password !== confirmPassword) {
        return WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, 'Password and confirm password does not match');

    }
    const dobDate = moment(dob).toDate();

    const newUserRequest = dto.UserRegisterDto({ email, phoneNumber, name, address, dobDate, password, dob, roles });
    try {
        const id = await service.UserRegister(newUserRequest);
        WriteJsonResponse(res, { user_id: id });
        return;
    } catch (error) {
        logger.error("Error in registerController:", error);
        WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};
function isValidEmail(email) {
    const MAX_EMAIL_LENGTH = 256;
    if (email.length > MAX_EMAIL_LENGTH) {
        return false;
    }
    const emailRegex = new RegExp('^[^\\s@]+@(?:[^\\s@]+\\.)+[^\\s@]+$');
    return emailRegex.test(email);
}
const loginController = async (req, res) => {
    const { email, password } = req.body;
    logger.info("Login request:", req.body);

    if (!isValidEmail(email) && !password) {
        WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, "Invalid email or password");
        return;
    }

    try {
        const { user, token } = await service.UserLogin(dto.UserLoginDto({ email, password }));
        res.cookie("token", token, { httpOnly: true });
        WriteJsonResponse(res, { user_id: user._id, name: user.name, email: user.email, roles: user.roles });
        return;
    } catch (error) {
        logger.error(error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
const logOutController = async (req, res) => {
    res.cookie("token", "").json({ message: "Logout success" });
};

module.exports = { loginController, logOutController, registerController };
