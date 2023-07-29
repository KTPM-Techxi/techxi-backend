const bcryptUtil = require("../../../common/util/bcrypt.util");
const jwt = require("jsonwebtoken");
const cfg = require("../../../common/config/config").loadConfig();
const { UserLoginDto, UserRegisterDto, UserInfoDto } = require("../userservice/user_service.dto");
const { plainToClass } = require("class-transformer");
const UserCredentials = require("../../models/auth/user_credential.dm");
const repo = require("../../repository/user.repo");
const logger = require("../../../common/logutil/logutil").GetLogger("USER_SERVICE");
const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user/user.dm");

async function UserLogin(userLoginDto) {
    const user = await repo.FindUserByEmail(userLoginDto.email);
    if (!user) {
        throw new Error("User not found");
    }
    logger.info("user info: ", user);

    try {
        const credential = await repo.FindUserCredential(user.id);
        if (!credential) {
            const error = new Error("User credential not found");
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
        }
        const isMatch = bcryptUtil.comparePassword(userLoginDto.password, credential.password);
        const token = "";
        if (isMatch) {
            token = jwt.sign({ id: user.id }, cfg.tokenSecret, {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: "300"
            });
        }
        if (token === "") {
            const error = new Error("Token not created");
            throw error;
        }

        const UserInfo = plainToClass(UserInfoDto, user);
        logger.info("info user: ", UserInfo);
        return { UserInfo, token };
    } catch (error) {
        throw error;
    }
}
async function UserRegister(userRegisterDto) {
    const { email, phoneNumber, name, password } = userRegisterDto;

    const user = await repo.FindUserByEmail(email);
    if (user) {
        const error = new Error("User already registered");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    try {
        const hashedPassword = await bcryptUtil.hashPassword(password);
        const newUser = await User.create({ email, phoneNumber, name, password: hashedPassword });
        return newUser; // Return the created user
    } catch (error) {
        throw error; // Rethrow the error for the calling code to handle
    }
}
module.exports = { UserLogin, UserRegister };
