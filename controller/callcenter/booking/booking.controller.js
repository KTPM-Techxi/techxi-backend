const service = require("../../../internal/service/bookingservice/booking.service");
const driverService = require("../../../internal/service/driverservice/driver.service");
const httputil = require("../../../common/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../../common/logutil").GetLogger("BOOKING_CONTROLLER");
const util = require("../../../common/util");
const treeify = require("treeify");
const dto = require("../../../internal/service/bookingservice/booking_service.dto");
const type = require("./type");
const { validationResult } = require("express-validator");
const messager = require("../../../internal/service/fcm.service");
const appConst = require("../../../common/constants");
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
        logger.info("Filter convert Dto:\n", util.LogObject(filterReqDto));

        const bookings = await service.GetListBookings(filterReqDto);
        httputil.WriteJsonResponse(res, bookings);
        return;
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

const CreateBooking = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.error(errors.array());
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, errors.array());
            return;
        }
        const bookingReq = type.BookingReq(req.body);
        const bookingReqDto = dto.BookingReqDto(bookingReq);
        //TODO: handle loction
        if (!bookingReq.pickup_location || !bookingReq.destination) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, 1, { status: "rejected" });
            return;
        }

        const bookingResp = service.CreateNewBooking(bookingReqDto);

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { bookingId: bookingResp.bookingId });

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
const FindDriver = (req, res) => {
    try {
        const longitude = req.query.longtitude;
        const latitude = req.query.latitude;
        if (!longitude || !latitude) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, -1, "location not specified");
            return;
        }
        const driverIds = driverService.GetNearestDriversFromLocation(longitude, latitude, appConst.MAX_DISTANCE);
        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, driverIds);
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

module.exports = { ListBookings, CreateBooking, GetBookingDetails, acceptBooking, declineBooking, completeBooking, FindDriver };
