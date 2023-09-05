const credentialdm = require("../models/auth/user_credential.dm");
const userdm = require("../models/user/user.dm");
const driverdm = require("../models/user/driver/driver.dm");
const customerdm = require("../models/user/customer/customer.dm");
const logger = require("../../common/logutil").GetLogger("USER_REPO");
async function FindUserCredential(userId) {
    try {
        logger.info("FindUserCredential: ", userId);
        const userCredential = await credentialdm.UserCredential.findOne({ user_id: userId });
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

async function FindUsersWithFilter(filter) {
    try {
        let filterRepoReq = {};
        if (filter.roles.length > 0) {
            filterRepoReq.role = { $in: filter.roles };
        }
        logger.info("Requesting filter for user:", filter);

        let query = userdm.User.find(filterRepoReq);
        const total = await userdm.User.count(filterRepoReq)
            .then((count) => {
                logger.info("Total documents:", count);
            })
            .catch((err) => {
                logger.error("Error counting documents:", err);
            });
        if (total === 0) {
            return { users: [], isFound: false, total };
        }
        query = query.skip(filter.currentPage * filter.pageSize - filter.pageSize).limit(filter.pageSize);

        const users = await query.exec();
        //logger.info("List users:\n", users);
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
async function FindUserById(id) {
    try {
        const user = await userdm.User.findById(id);
        if (!user) {
            return { user: null, isFound: false };
        }
        return { user: user, isFound: true };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function FindCustomerBankingByUserId(userId) {
    try {
        const customer = await customerdm.CustomerBanking.findOne({ user_id: userId });
        if (!customer) {
            return { customer: null, isFound: false };
        }
        return { customer: customer, isFound: true };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function FindDriverVehiclesByUserId(userId) {
    try {
        const driver = await driverdm.DriverVehicles.findOne({ user_id: userId });
        if (!driver) {
            return { driver: null, isFound: false };
        }
        return { driver: driver, isFound: true };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function FindDriverBankingByUserId(userId) {
    try {
        const driver = await driverdm.DriverBanking.findOne({ user_id: userId });
        if (!driver) {
            return { driver: null, isFound: false };
        }
        return { driver: driver, isFound: true };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}
async function updateFCMbyId(userId, token) {
    try {
        const user = await userdm.User.findByIdAndUpdate(userId, { fcmToken: token });
        if (!user) {
            return { user: null, isFound: false };
        }
        return { user: user, isFound: true };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function FindUserByPhone(phoneNumber) {
    try {
        const user = await userdm.User.findOne({ phone_number: phoneNumber });
        if (!user) {
            return { user: null, isFound: false };
        }
        return { user: user, isFound: true };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    FindUserCredential,
    FindUserByEmail,
    FindUserById,
    FindCustomerBankingByUserId,
    FindDriverVehiclesByUserId,
    FindDriverBankingByUserId,
    FindUserByPhone,
    CreateNewUser,
    CreateNewUserCredential,
    DeleteUserById,
    DeleteUserByEmail,
    FindUsersWithFilter,
    FindCustomerLocation,
    updateFCMbyId
};
