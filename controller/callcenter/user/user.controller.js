const service = require("../../../internal/service/userservice/user.service");
const httputil = require("../../../common/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../../common/logutil").GetLogger("BOOKING_CONTROLLER");
const util = require("../../../common/util");
const treeify = require("treeify");
const dto = require("../../../internal/service/userservice/user_service.dto");
const type = require("./type");
const ROLE = require("../../../internal/models/user/const").USER_TYPES;
const ListUsersWithFilter = async (req, res) => {
    try {
        const filterReq = type.filterReq(req.query);
        logger.info("Filter request:\n" + treeify.asTree(filterReq, true));
        filterReq.roles = filterReq.roles.filter((role) => typeof role === "string" && role.trim() !== "");
        logger.info("Filter request:\n" + treeify.asTree(filterReq, true));
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

const GetUserDetails = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const resp = await service.GetUserInfo(userId, role);
        const userInfoResp = type.UserInfoResponse(resp.userInfoDto);
        if (role === ROLE.DRIVER) {
            httputil.WriteJsonResponse(res, {
                userInfo: userInfoResp,
                banking: resp.banking,
                vehicles: resp.vehicles
            });
            return;
        }
        if (role === ROLE.CUSTOMER) {
            httputil.WriteJsonResponse(res, {
                userInfo: userInfoResp,
                banking: resp.banking
            });
            return;
        }
        httputil.WriteJsonResponse(res, { userInfo: userInfoResp });
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const updateUserFCM = async (req, res) => {
    try {
        const { user_id, fcmToken } = req.body;
        const resp = await service.updateFCM(user_id, fcmToken);

        httputil.WriteJsonResponse(res);
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { ListUsersWithFilter, GetUserDetails, updateUserFCM };
