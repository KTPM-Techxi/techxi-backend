const bcryptUtil = require("../../../common/util/bcrypt.util");
const jwt = require("jsonwebtoken");
const cfg = require("../../../common/config/config").loadConfig();
const { UserLoginDto, UserRegisterDto, UserInfoDto } = require("../userservice/user_service.dto");
const repo = require("../../repository/user.repo");
const logger = require("../../../common/logutil/logutil").GetLogger("USER_SERVICE");
const { StatusCodes } = require("http-status-codes");
const {STATUS} = require("../../../common/constants/constants");
const appConst = require("../../../common/constants/constants");
const User = require("../../models/user/user.dm");

async function UserLogin(userLoginDto) {
    logger.info("userLoginDto: ", userLoginDto);
    const user = await repo.FindUserByEmail(userLoginDto.email);
    if (!user) {
        throw new Error("User not found");
    }
    logger.info("user info: ", user);
    const userId = user._id.toString();
    try {
        const credential = await repo.FindUserCredential(userId);
        if (!credential) {
            const error = new Error("User credential not found");
            logger.error(error);
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
        }
        const isMatch = bcryptUtil.comparePassword(userLoginDto.password, credential.password);
        let token = "";
        if (isMatch) {
            token = jwt.sign({ id: userId }, cfg.tokenSecret, {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: "300"
            });
        }
        if (token === "") {
            const error = new Error("Token not created");
            throw error;
        }
        let id = user._id;
        return { id, token };
    } catch (error) {
        throw error;
    }
}
async function UserRegister(userRegisterDto) {
    logger.info("userRegisterDto: ", userRegisterDto);
    const user = await repo.FindUserByEmail(userRegisterDto.email);
    if (user) {
        const error = new Error("User already registered");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    try {
        const hashedPassword = await bcryptUtil.hashPassword(userRegisterDto.password);
        if (!hashedPassword) {
            const error = new Error("Password not hashed");
            error.satusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }

        const newUser = {
            name: userRegisterDto.name,
            email: userRegisterDto.email,
            phoneNumber: userRegisterDto.phoneNumber,
            address: userRegisterDto.address,
            dob: userRegisterDto.dob,
        }
        const savedUser = await repo.CreateNewUser(newUser)
        if (!savedUser) {
            const error = new Error("User not saved");
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
        let id = savedUser._id.toString();

        if (!Object.values(appConst.USER_TYPES).includes(userRegisterDto.roles)) {
            const error = new Error("Invalid user type");
            error.statusCode = StatusCodes.BAD_REQUEST;
            throw error;
        }
        const role = await repo.GetRolesByName(userRegisterDto.roles.toString())
        const newCredential = {
            user_id: id,
            email: userRegisterDto.email,
            password: hashedPassword,
            roles: role.map(role => role._id),
            status: STATUS.ACTIVE,
        }

        const savedCredential = await repo.CreateNewUserCredential(newCredential);
        if (!savedCredential) {
            const error = new Error("Credential not saved");
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
        return id; // Return the created user
    } catch (error) {
        throw error; // Rethrow the error for the calling code to handle
    }
}
module.exports = { UserLogin, UserRegister };
