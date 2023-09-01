const service = require("../../../internal/service/bookingservice/booking.service");
const httputil = require("../../../common/httputil/httputil");
const { StatusCodes } = require("http-status-codes");
const logger = require("../../../common/logutil/logutil").GetLogger("BOOKING_CONTROLLER");
const util = require("../../../common/util/util");
const treeify = require("treeify");
const dto = require("../../../internal/service/bookingservice/booking_service.dto");
const type = require("./type");
const messager = require("../../../internal/service/fcm.service");
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
            filterReqDto.pageSize = 10;
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
        const bookingReq = req.body;
        //TODO: handle loction
        if (!bookingReq.pickup_location || !bookingReq.destination) {
            httputil.WriteJsonResponseWithCode(res, StatusCodes.BAD_REQUEST, 1, { status: "rejected" });
            return;
        }

        const bookingReqDto = dto.BookingDto(bookingReq);
        const bookingResp = service.CreateNewBooking(bookingReqDto);

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { bookingId: bookingResp.bookingId });

        //find user
        // const driver = FindDriver()

        //Send message to driver
        // messager.fcmSendData(driver.fcmToken, bookingReq);
        return;
    } catch (error) {}
};

const FindDriver = (req, res) => {
    try {
    } catch (error) {}
};


const acceptBooking = (req, res) => {
    try {
        const accept = req.body;

        //update booking with accept.booking_id, accept.driver_id

        
        //send confirmation and driver data to user
        accept.message = "accept"
        messager.fcmSendData(accept.fcmToken, accept);

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { status: "success" });
        return;
    } catch (error) {}
};

const declineBooking = (req, res) => {
    try {
        const decline = req.body;

        //send decline to user or find new driver
        messager.fcmSendData(decline.fcmToken, {message: "decline"});

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { status: "success" });
        return;
    } catch (error) {}
};

const completeBooking = (req, res) => {
    try {
        const complete = req.body;

        //send decline to user or find new driver
        messager.fcmSendData(complete.fcmToken, {message: "complete"});

        httputil.WriteJsonResponseWithCode(res, StatusCodes.OK, 0, { status: "success" });
        return;
    } catch (error) {}
};

module.exports = { ListBookings, CreateBooking, acceptBooking, declineBooking, completeBooking };
