const dto = require("./user_service.dto");
const repo = require("../../repository/user.repo");
const driverRepo = require("../../repository/driver.repo");
const logger = require("../../../common/logutil").GetLogger("user.service.js");
const userdm = require("../../models/user/user.dm");
const { StatusCodes } = require("http-status-codes");
async function GetUsersInfo(filter) {
    try {
        if (filter.roles.length > 0) {
            for (const role of filter.roles) {
                if (role !== "" && !Object.values(userdm.ROLE).includes(role)) {
                    const error = new Error("Invalid role=" + role);
                    logger.error(error);
                    error.statusCode = StatusCodes.BAD_REQUEST;
                    throw error;
                }
            }
        }

        const { users, isFound, total } = await repo.FindUsersWithFilter(filter);
        if (!isFound) {
            return {
                users: [],
                currentPage: filter.currentPage,
                pageSize: filter.pageSize,
                totalItems: 0,
                total: total
            };
        }

        const usersDto = [];
        for (const user of users) {
            const userInfoDto = dto.UserInfoDto(user);
            usersDto.push(userInfoDto);
        }
        return {
            users: usersDto,
            currentPage: filter.currentPage,
            pageSize: filter.pageSize,
            totalItems: usersDto.length,
            total: total
        };
    } catch (error) {
        logger.error("Error while to get customers: ", error);
        throw error;
    }
}

async function GetUserInfo(id, role) {
    try {
        const { user, isFound } = await repo.FindUserById(id);
        if (!isFound) {
            const error = new Error("Not Found User");
            logger.error(error);
            error.statusCode = StatusCodes.NOT_FOUND_ERROR;
            throw error;
        }
        const userInfoDto = dto.UserInfoDto(user);

        if (role === userdm.ROLE.CUSTOMER) {
            const { customerBanking, isFound } = await repo.FindCustomerBankingByUserId(id);
            // TODO: Convert DTO
            if (!isFound) {
                const error = new Error("Not Found User");
                logger.error(error);
                error.statusCode = StatusCodes.NOT_FOUND_ERROR;
                throw error;
            }
            return {
                userInfoDto: userInfoDto,
                banking: customerBanking.bank_number,
            };
        }

        if (role === userdm.ROLE.DRIVER) {
            const driverBanking = await driverRepo.FindDriverBankingById(id);
            if (!driverBanking) {
                const error = new Error("Not Found User");
                logger.error(error);
                error.statusCode = StatusCodes.NOT_FOUND_ERROR;
                throw error;
            }
             const driverVehicles = await driverRepo.FindDriverVehiclesById(id);
            if (!driverVehicles) {
                const error = new Error("Not Found User");
                logger.error(error);
                error.statusCode = StatusCodes.NOT_FOUND_ERROR;
                throw error;
            }
            return {
                userInfo: userInfoDto,
                banking: driverBanking.bank_number,
                vehicles: {
                    verhicleNumber: driverVehicles.vehicle_number,
                    verhicleName: driverVehicles.vehicle_name,
                    vehicleType: driverVehicles.vehicle_type
                }
            };
        }

        return { userInfoDto: userInfoDto };
    } catch (error) {
        logger.error("Error while to get customers: ", error);
        throw error;
    }
}

async function updateFCM(id, token) {
    try {
        const { user, isFound } = await repo.updateFCMbyId(id, token);
        if (!isFound) {
            const error = new Error("Not Found User");
            logger.error(error);
            error.statusCode = StatusCodes.NOT_FOUND_ERROR;
            throw error;
        }
        const userInfoDto = dto.UserInfoDto(user);

        return { userInfoDto: userInfoDto };
    } catch (error) {
        logger.error("Error while to get customers: ", error);
        throw error;
    }
}

async function GetUserInfoByPhoneNumber(phoneNumber) {
    try {
        const { user, isFound } = await repo.FindUserByPhone(phoneNumber);
        if (!isFound) {
            return { user, isFound } ;
        }
        const userInfoDto = dto.UserInfoDto(user);
        return { user: userInfoDto, isFound } ;
    } catch (error) {
        logger.error("Error while to get customers by phone: ", error);
        throw error;
    }
}

async function SaveUsersWithoutAccount(customerName, customerPhoneNumber) {
    try {
        const newUser = new userdm.User({
            name: customerName,
            phoneNumber: customerPhoneNumber,
            role: userdm.ROLE.CUSTOMER,
        });
        const user = await repo.CreateNewUser(newUser)
        return { id: user._id };
    } catch (error) {
        logger.error("Error while saving users without account: ", error);
        throw error;
    }
}

module.exports = { GetUsersInfo, GetUserInfo, updateFCM, GetUserInfoByPhoneNumber, SaveUsersWithoutAccount };
