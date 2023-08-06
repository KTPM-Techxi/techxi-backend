const dto = require("./user_service.dto");
const repo = require("../../repository/user.repo");
const logger = require("../../../common/logutil/logutil").GetLogger("USER_SERVICE");
const { StatusCodes } = require("http-status-codes");
async function GetCustomers(paginate) {
    try {
        const { customers, _, total } = await repo.FindCustomers(paginate);
        const customersDto = [];
        for (const customer of customers) {
            const customerDto = dto.UserInfoDto(customer);
            customersDto.push(customerDto);
        }

        return {
            customers: customersDto,
            currentPage: filter.currentPage,
            pageSize: filter.pageSize,
            totalItems: bookingsDto.length,
            total: total
        };
    } catch (error) {
        logger.error('Error while to get customers: ', error);
        throw error;
    }
}

module.exports = { GetCustomers };
