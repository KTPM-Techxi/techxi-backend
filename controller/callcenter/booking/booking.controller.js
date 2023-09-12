const service = require("../../../internal/service/bookingservice/booking.service");
const driverService = require("../../../internal/service/driverservice/driver.service");
const httputil = require("../../../common/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../../common/logutil").GetLogger("booking.controller.js");
const util = require("../../../common/util");
const treeify = require("treeify");
const dto = require("../../../internal/service/bookingservice/booking_service.dto");
const type = require("./type");
const { validationResult } = require("express-validator");
const { USER_TYPES } = require("../../../internal/models/user/const");
const messager = require("../../../internal/service/fcm.service");
const appConst = require("../../../common/constants");
const userService = require("../../../internal/service/userservice/user.service");
const ListBookings = async (req, res) => {
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
            filterReqDto.pageSize = 1000;
        }
        // logger.info("Filter convert Dto:\n", util.LogObject(filterReqDto));

        const bookings = await service.GetListBookings(filterReqDto);
        httputil.WriteJsonResponse(res, bookings);
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const CreateBooking = async (req, res) => {
    try {
        const bookingReq = type.BookingReq(req.body);
        logger.info("cookie user: " + req.cookies.user);
        const agentId = req.cookies.user.user_id;
        if (!agentId || req.cookies.user.role !== USER_TYPES.CALL_CENTER_AGENT) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.UNAUTHORIZED, -1, "must be authorized");
            return;
        }
        //TODO: handle loction
        if (!bookingReq.pickupLocation || !bookingReq.destination) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, 1, { status: "invalid location" });
            return;
        }
        let { customer, isFound } = await userService.GetUserInfoByPhoneNumber(bookingReq.customerPhoneNumber);
        if (!isFound) {
            customer = await userService.SaveUsersWithoutAccount(bookingReq.customerName, bookingReq.customerPhoneNumber);
        }
        const bookingReqDto = dto.BookingReqDto(bookingReq, agentId, undefined, customer.id);

        // TODO: Send notification to driver
        const bookingResp = await service.CreateNewBooking(bookingReqDto);

        httputil.WriteJsonResponse(res, { bookingId: bookingResp.bookingId });

        //find user
        // const driver = FindDriver()

        //Send message to driver
        // messager.fcmSendData(driver.fcmToken, bookingReq);
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const GetBookingDetails = async (req, res) => {
    try {
        const bookingId = req.query.bookingId;
        logger.info(bookingId);
        if (!bookingId) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, "bookingId is required");
            return;
        }
        const bookingDtoResp = await service.GetBookingDetails(bookingId);
        logger.info("Booking", bookingDtoResp);
        const bookingResp = type.BookingResponse(bookingDtoResp);
        httputil.WriteJsonResponse(res, bookingResp);
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const FindDriver = async (req, res) => {
    try {
        const bookingId = req.query.booking_id;
        const driver = await driverService.GetNearestDriversFromLocation(bookingId, appConst.MAX_DISTANCE);
        httputil.WriteJsonResponse(res, { driver_id: driver.userId });
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const acceptBooking = (req, res) => {
    try {
        const accept = req.body;

        //update booking with accept.booking_id, accept.driver_id

        //send confirmation and driver data to user
        accept.message = "accept";
        messager.fcmSendData(accept.fcmToken, accept);

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { status: "success" });
        return;
    } catch (error) {}
};

const declineBooking = (req, res) => {
    try {
        const decline = req.body;

        //send decline to user or find new driver
        messager.fcmSendData(decline.fcmToken, { message: "decline" });

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { status: "success" });
        return;
    } catch (error) {}
};

const completeBooking = (req, res) => {
    try {
        const complete = req.body;

        //send decline to user or find new driver
        messager.fcmSendData(complete.fcmToken, { message: "complete" });

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { status: "success" });
        return;
    } catch (error) {}
};

const DriverResponse = async (req, res) => {
    try {
        const driverBookingResp = type.DriverBookingResp(req.body);
        // TODO: handle service
        const updated = await service.UpdateStatusBooking(driverBookingResp);
        if (!updated.isUpdate) {
            logger.error("Couldn't update");
            httputil.WriteJsonResponseWithCode(res, StatusCodes.NOT_FOUND, -1, "Couldn't update");
        }
        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, {
            driver: updated.driver,
            booking_id: updated.bookingId,
            booking_status: updated.bookingStatus
        });
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const UpdateBooking = async (req, res) => {
    try {
        const bookingId = req.query.booking_id;
        const updateBookingReq = type.UpdateBookingReq(req.body);
        const updated = await service.UpdateBooking(bookingId, updateBookingReq);
        if (!updated.isUpdate) {
            logger.error("Couldn't update");
            httputil.WriteJsonResponseWithCode(res, StatusCodes.NOT_FOUND, -1, "Couldn't update");
        }
        httputil.WriteJsonResponse(res, { booking_id: updated.bookingId });
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = {
    ListBookings,
    CreateBooking,
    GetBookingDetails,
    acceptBooking,
    declineBooking,
    completeBooking,
    FindDriver,
    DriverResponse,
    UpdateBooking
};
