const dto = require("./user_service.dto");
const repo = require("../../repository/user.repo");
const logger = require("../../../common/logutil/logutil").GetLogger("USER_SERVICE");
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
                banking: customerBanking
            };
        }

        if (role === userdm.ROLE.DRIVER) {
            const driverBanking = { driverBanking: undefined, isFound: undefined };
            driverBanking = await repo.FindDriverBankingByUserId(id);
            // TODO: Convert DTO
            const driverVehicles = { driverBanking: undefined, isFound: undefined };
            driverBanking = await repo.FindDriverVehiclesByUserId(id);
            // TODO: Convert DTO and remove comments if have data
            // if (!isFound) {
            //     const error = new Error("Not Found User");
            //     logger.error(error);
            //     error.statusCode = StatusCodes.NOT_FOUND_ERROR;
            //     throw error;
            // }
            return {
                userInfoDto: userInfoDto,
                banking: driverBanking,
                vehicles: driverVehicles
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

module.exports = { GetUsersInfo, GetUserInfo, updateFCM };
