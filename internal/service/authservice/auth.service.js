const bcryptUtil = require("../../../common/util/bcrypt.util");
const jwt = require("jsonwebtoken");
const cfg = require("../../../common/config").loadConfig();
const repo = require("../../repository/user.repo");
const logger = require("../../../common/logutil").GetLogger("auth.service.js");
const { StatusCodes } = require("http-status-codes");
const { STATUS } = require("../../../common/constants");
const userdm = require("../../models/user/user.dm");
const userCredentialdm = require("../../models/auth/user_credential.dm");

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
        logger.info("credential: ", credential);
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
                expiresIn: "365d"
            });
        }
        if (token === "") {
            const error = new Error("Passwords do not match");
            throw error;
        }
        return { userId, token };
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

        const newUser = new userdm.User({
            name: userRegisterDto.name,
            email: userRegisterDto.email,
            phoneNumber: userRegisterDto.phoneNumber,
            address: userRegisterDto.address,
            dob: userRegisterDto.dob,
            role: userRegisterDto.role
        });
        const savedUser = await repo.CreateNewUser(newUser);
        if (!savedUser) {
            const error = new Error("User not saved");
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
        let id = savedUser._id.toString();

        if (!Object.values(userdm.ROLE).includes(userRegisterDto.role)) {
            const error = new Error("Invalid user type");
            error.statusCode = StatusCodes.BAD_REQUEST;
            await repo.DeleteUserById(id);
            throw error;
        }

        const newCredential = new userCredentialdm.UserCredential({
            user_id: id,
            email: userRegisterDto.email,
            password: hashedPassword,
            status: STATUS.ACTIVE
        });
        const savedCredential = await repo.CreateNewUserCredential(newCredential);
        if (!savedCredential) {
            const error = new Error("Credential not saved");
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
        return id; // Return the created user
    } catch (error) {
        await repo.DeleteUserByEmail(userRegisterDto.email);
        throw error; // Rethrow the error for the calling code to handle
    }
}
module.exports = { UserLogin, UserRegister };
