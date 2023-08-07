const service = require("../../../internal/service/userservice/user.service");
const httputil = require("../../../common/httputil/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../../common/logutil/logutil").GetLogger("BOOKING_CONTROLLER");
const util = require("../../../common/util/util");
const treeify = require("treeify");
const dto = require("../../../internal/service/userservice/user_service.dto");
const type = require("./type");
const ListUsersWithFilter = async (req, res) => {
    try {
        logger.info("Filter query:\n" + treeify.asTree(req.query, true));
        const filterReq = type.filterReq(req.query);
        logger.info("Filter request:\n" + treeify.asTree(filterReq, true));
        filterReq.roles = filterReq.roles.filter(role => typeof role === 'string' && role.trim() !== '');
        const filterReqDto = dto.FilterReqDto({
            roles: filterReq.roles || [],
            currentPage: util.ConvertToType(filterReq.currentPageStr, "number"),
            pageSize: util.ConvertToType(filterReq.pageSizeStr, "number")
        });
        logger.info("Filter request DTO:\n" + treeify.asTree(filterReqDto, true));

        if (filterReqDto.currentPage === undefined) {
            filterReqDto.currentPage = 1;
        }
        if (filterReqDto.pageSize === undefined) {
            filterReqDto.pageSize = 10;
        }

        const UsersInfoResp = await service.GetUsersInfo(filterReqDto);
        httputil.WriteJsonResponse(res, UsersInfoResp);
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { ListUsersWithFilter };
