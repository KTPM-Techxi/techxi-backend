const util = require("../../common/util/bcrypt.util");
const service = require("../../internal/service/userservice/user.service");
const dto = require("../../internal/service/userservice/user_service.dto");
const logger = require("../../common/logutil/logutil").GetLogger("AUTH_CONTROLLER");
const User = require("../../internal/models/auth/user_credential.dm");
const { StatusCodes } = require("http-status-codes");
const moment = require('moment');
const {UserLoginDto} = require("../../internal/service/userservice/user_service.dto");
const registerController = async (req, res) => {
    const { name, phoneNumber, email, address, dob, password, confirmPassword, roles } = req.body;
    logger.info("Register request:", req.body);
    if (!name || !phoneNumber || !email || !address || !dob || !password || !confirmPassword || !roles) {
        return res.status(400).json({ error: 'Missing credentials' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password does not match' });
    }
    const dobDate = moment(dob).toDate();

    const newUserRequest = dto.UserRegisterDto({email, phoneNumber, name, address, dobDate, password, dob,roles});
    try {
        const id = await service.UserRegister(newUserRequest);
        res.status(StatusCodes.CREATED).json({ user_id: id });
    } catch (error) {
        logger.error("Error in registerController:", error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email or password" });
    }

    try {
        const { user, token } = await service.UserLogin(dto.UserLoginDto({email, password}));
        return res.cookie("token", token, { httpOnly: true }).json(user);
    } catch (error) {
        logger.error(error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
const logOutController = async (req, res) => {
    res.cookie("token", "").json({ message: "Logout success" });
};

module.exports = { loginController, logOutController, registerController };
