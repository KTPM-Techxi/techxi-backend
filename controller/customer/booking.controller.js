const bookingService = require("../../internal/service/bookingservice/booking.service");
const driverService = require("../../internal/service/driverservice/driver.service");
const httputil = require("../../common/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../common/logutil").GetLogger("booking.controller.js");
const util = require("../../common/util");
const treeify = require("treeify");
const dto = require("../../internal/service/bookingservice/booking_service.dto");
const type = require("./type");
const { USER_TYPES } = require("../../internal/models/user/const");
const messager = require("../../internal/service/fcm.service");
const appConst = require("../../common/constants");

const CreateBookingRequest = async (req, res) => {
    try {
        const bookingReq = type.BookingReq(req.body);
        logger.info("cookie user: " + req.cookies.user);
        const customerId = req.cookies.user.user_id;
        if (!customerId || req.cookies.user.role !== USER_TYPES.CUSTOMER) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.UNAUTHORIZED, -1, "User must be authorized");
            return;
        }
        //TODO: handle loction
        if (!bookingReq.pickupLocation || !bookingReq.destination) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, 1, { status: "invalid location" });
            return;
        }
        const bookingReqDto = dto.BookingReqDto(bookingReq, undefined, undefined, customerId);

        // TODO: Send notification to driver
        const bookingResp = await bookingService.CreateNewBooking(bookingReqDto);

        httputil.WriteJsonResponse(res, { bookingId: bookingResp.bookingId });
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { CreateBookingRequest };
