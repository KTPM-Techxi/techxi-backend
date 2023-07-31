const UserCredentials = require("../models/auth/user_credential.dm");
const User = require("../models/user/user.dm");
const {STATUS} = require("../../common/constants/constants");
const Role = require("../models/auth/role");
const logger = require("../../common/logutil/logutil").GetLogger("USER_REPO");
async function FindUserCredential(userId) {
    try {
        logger.info("FindUserCredential: ", userId);
        const userCredential = await UserCredentials.findOne({ user_id: userId });
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
        await DeleteUserById(userCredentials.user_id);
        logger.error(error);
        throw error;
    }
}

async function DeleteUserById(id) {
    try {
        const check = await User.deleteOne({ _id: id });
        if (check) {
            logger.info('User deleted.');
        } else {
            logger.info('User not deleted.');
        }
    } catch (deleteError) {
        console.error('Error deleting user:', deleteError);
    }
}

async function DeleteUserByEmail(email) {
    try {
        const check = await User.deleteOne({ email: email });
        if (check) {
            logger.info('User deleted.');
        } else {
            logger.info('User not deleted.');
        }
    } catch (deleteError) {
        console.error('Error deleting user:', deleteError);
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

async function FindRolesById(id) {
    try {
        const roles = await Role.findOne({ _id: id });
        logger.info("FindRolesById: ", roles);
        return roles;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
module.exports = {
    FindUserCredential,
    FindUserByEmail,
    FindRolesById,
    CreateNewUser, CreateNewUserCredential,
    GetRolesByName,
    DeleteUserById, DeleteUserByEmail
};
