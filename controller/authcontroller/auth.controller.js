const util = require("../../common/util/bcrypt.util");
const service = require("../../internal/service/userservice/user.service");
const logger = require("../../common/logutil/logutil").GetLogger("AUTH_CONTROLLER");
const User = require("../../internal/models/auth/user_credential.dm");
const { StatusCodes } = require("http-status-codes");
const registerController = async (req, res) => {
    const user = req.body;
    try {
        await service.UserRegister(user);
        res.status(StatusCodes.CREATED).json({ message: "Registration successful" });
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
        const { user, token } = await service.UserLogin({ email, password });
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
