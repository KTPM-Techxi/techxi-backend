const util = require('../../common/util/bcrypt.util');
const service = require('../../internal/service/userservice/user.service')
const logger = require('../../common/logutil/logutil').GetLogger('AUTH_CONTROLLER')
const User = require('../../internal/models/auth/user_credential.dm');
const { StatusCodes } = require('http-status-codes');
const registerController = async (req, res) => {
    const { email, phoneNumber, name, password } = req.body;
    try {
        // Check if the user is already registered
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User already registered' });
        } else {
            const hashedPassword = await util.hashPassword(password);
            const newUser = await User.create({ email, phoneNumber, name, password: hashedPassword });
            return res.status(StatusCodes.OK).json({ message: 'Register successfully' });
        }
    } catch (error) {
        console.error(error.statusCode + ": " + error.message);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (email === "" && password === "") {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid email or password' });
    }

    try {
        const { user, token } = await service.UserLogin({ email, password });
        return res.cookie('token', token, { httpOnly: true }).json(user);
    } catch (error) {
        logger.error(error)
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
const logOutController = async (req, res) => {
    res.cookie('token', '').json({ message: 'Logout success' });
};

module.exports = { loginController, logOutController, registerController };
