const dto = require("./user_service.dto");
const repo = require("../../repository/user.repo");
const logger = require("../../../common/logutil/logutil").GetLogger("USER_SERVICE");
const userdm = require("../../models/user/user.dm");
const { StatusCodes } = require("http-status-codes");
async function GetUsersInfo(filter) {
    try {
        if (filter.roles.length > 0) {
            for (const role of filter.roles) {
                if (role !== '' && !Object.values(userdm.ROLE).includes(role)) {
                    const error = new Error("Invalid role=" + role);
                    logger.error(error);
                    error.statusCode = StatusCodes.BAD_REQUEST
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
        logger.error('Error while to get customers: ', error);
        throw error;
    }
}
module.exports = { GetUsersInfo };
