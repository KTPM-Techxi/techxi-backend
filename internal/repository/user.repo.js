const credentialdm = require("../models/auth/user_credential.dm");
const userdm = require("../models/user/user.dm");
const driverdm = require("../models/user/driver/driver.dm");
const customerdm = require("../models/user/customer/customer.dm");
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
        const user = await userdm.User.findOne({ email: email });
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function CreateNewUser(user) {
    try {
        const savedUser = await userdm.User.create(user);
        return savedUser._id;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function CreateNewUserCredential(userCredential) {
    try {
        const savedUserCredentials = await credentialdm.UserCredential.create(userCredential);
        return savedUserCredentials;
    } catch (error) {
        await DeleteUserById(userCredential.user_id);
        logger.error(error);
        throw error;
    }
}

async function DeleteUserById(id) {
    try {
        const check = await userdm.User.deleteOne({ _id: id });
        if (check) {
            logger.info("User deleted.");
        } else {
            logger.info("User not deleted.");
        }
    } catch (deleteError) {
        console.error("Error deleting user:", deleteError);
    }
}

async function DeleteUserByEmail(email) {
    try {
        const check = await userdm.User.deleteOne({ email: email });
        if (check) {
            logger.info("User deleted.");
        } else {
            logger.info("User not deleted.");
        }
    } catch (deleteError) {
        console.error("Error deleting user:", deleteError);
    }
}

async function FindCustomers(paginate) {
    try {
        let query = userdm.User.find({ role: userdm.ROLE.CUSTOMER });

        const total = await userdm.User.count({})
            .then((count) => {
                logger.info("Total documents:", count);
            })
            .catch((err) => {
                logger.error("Error counting documents:", err);
            });

        query = query.skip(paginate.currentPage * paginate.pageSize - paginate.pageSize).limit(paginate.pageSize);

        const users = await query.exec();
        logger.info("List customers:\n", users);
        return { users, isFound: true, total };
    } catch (error) {
        logger.error("Error while to get bookings, err=", error);
        throw error;
    }
}

async function FindCustomerLocation(customerId) {
    try {
        const customerLocations = await customerdm.CustomerLocations.find({
            customer_id: customerId,
            active: customerdm.STATUS.ACTIVE
        }).exec();
        logger.info("customer location: ", customerLocations);
        return customerLocations;
    } catch (error) {
        logger.error("Error while to get bookings, err=", error);
        throw error;
    }
}

module.exports = {
    FindUserCredential,
    FindUserByEmail,
    CreateNewUser,
    CreateNewUserCredential,
    DeleteUserById,
    DeleteUserByEmail,
    FindCustomers, FindCustomerLocation
};
