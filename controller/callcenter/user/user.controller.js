const service = require("../../../internal/service/userservice/user.service");
const httputil = require("../../../common/httputil/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../../common/logutil/logutil").GetLogger("BOOKING_CONTROLLER");
const util = require("../../../common/util/util");
const treeify = require("treeify");
const dto = require("../../../internal/service/userservice/user_service.dto");
const type = require("./type");
const ListCustomers = async (req, res) => {
    try {
        const filterReq = type.filterReq(req.query);
        logger.info("Filter request:\n" + treeify.asTree(req.query, true));

        const filterReqDto = dto.FilterReqDto({
            currentPage: util.ConvertToType(filterReq.currentPageStr, "number"),
            pageSize: util.ConvertToType(filterReq.pageSizeStr, "number")
        });
        if (filterReqDto.currentPage === undefined) {
            filterReqDto.currentPage = 1;
        }
        if (filterReqDto.pageSize === undefined) {
            filterReqDto.pageSize = 10;
        }

        const customers = await service.GetCustomers(filterReqDto);
        httputil.WriteJsonResponse(res, customers);
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { ListCustomers };
