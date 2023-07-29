const UserCredentials = require("../models/auth/user_credential.dm");
const User = require("../models/user/user.dm");
const {STATUS} = require("../../common/constants/constants");
const Role = require("../models/auth/role");
const logger = require("../../common/logutil/logutil").GetLogger("USER_REPO");
async function FindUserCredential(id) {
    try {
        const userCredential = await UserCredentials.findOne({ id: id });
        return userCredential;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function FindUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function CreateNewUser(user) {
    try {
        const newUser = await User(user);
        const savedUser = await User.create(newUser);
        return savedUser._id;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function CreateNewUserCredential(userCredentials) {
    try {
        const newUserCredentials = await UserCredentials(userCredentials);
        const savedUserCredentials = await UserCredentials.create(newUserCredentials);
        return savedUserCredentials;
    } catch (error) {
        try {
            const check = await User.deleteOne({ _id: userCredentials.user_id });
            if (check) {
                logger.info('User deleted.');
            } else {
                logger.info('User not deleted.');
            }
        } catch (deleteError) {
            console.error('Error deleting user:', deleteError);
        }
        logger.error(error);
        throw error;
    }
}
 async function GetRolesByName(name) {
    try {
        const roles = await Role.findOne({ name: name });
        return roles;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
module.exports = {
    FindUserCredential,
    FindUserByEmail,
    CreateNewUser, CreateNewUserCredential,
    GetRolesByName
};
