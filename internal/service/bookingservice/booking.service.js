const bookingdm = require("../../models/booking/booking.dm");
const dto = require("./booking_service.dto");
const repo = require("../../repository/booking.repo");
const driverRepo = require("../../repository/driver.repo");
const userRepo = require("../../repository/user.repo");
const logger = require("../../../common/logutil").GetLogger("booking.service.js");
const { StatusCodes } = require("http-status-codes");
const appConst = require("../../../common/constants");

async function GetListBookings(filter) {
    try {
        const { bookings, _, total } = await repo.FindBookingsWithFilter(filter);
        const bookingsDto = [];
        for (const booking of bookings) {
            const bookingDto = dto.BookingDto(booking);
            bookingsDto.push(bookingDto);
        }

        return {
            bookings: bookingsDto,
            currentPage: filter.currentPage,
            pageSize: filter.pageSize,
            totalItems: bookingsDto.length,
            total: total
        };
    } catch (error) {
        throw error;
    }
}

async function GetBookingDetails(bookingId) {
    try {
        const booking = await repo.FindBookingById(bookingId);
        if (!booking) {
            throw {
                code: StatusCodes.NOT_FOUND,
                message: "Booking not found"
            };
        }
        const driverInfo = await driverRepo.GetDriverWithVerhicleById(booking.driver_id);
        const customer = await userRepo.FindUserById(booking.customer_id);
        if (!customer) {
            // TODO: Handle non-customer
        }
        const agent = await userRepo.FindUserById(booking.call_center_agents_id);
        const bookingResp = dto.BookingDetailsDto(booking, driverInfo, customer.user, agent.user);
        logger.info("Booking", bookingResp);
        return bookingResp;
    } catch (error) {
        throw error;
    }
}
async function CreateNewBooking(bookingReq) {
    try {
        if (bookingReq.callCenterAgentsId) {
            const callCenterAgent = await userRepo.FindUserById(bookingReq.callCenterAgentsId);
            if (!callCenterAgent.isFound) {
                const error = new Error("Agent not found: " + bookingReq.callCenterAgentsId);
                logger.error(error);
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
        }
        const driver = await userRepo.FindUserById(bookingReq.driverId);
        if (!driver.isFound) {
            const error = new Error("Driver not found: " + bookingReq.driverId);
            logger.error(error);
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
        }
        if (bookingReq.customerId) {
            const customer = await userRepo.FindUserById(bookingReq.customerId);
            if (!customer.isFound) {
                const error = new Error("Driver not found: " + bookingReq.customerId);
                logger.error(error);
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
        }

        const booking = await repo.CreateBooking(
            new bookingdm.Booking({
                call_center_agents_id: bookingReq.callCenterAgentsId,
                driver_id: bookingReq.driverId,
                customer_id: bookingReq.customerId,
                pickup_address: bookingReq.pickupAddress,
                pickup_location: {
                    latitude: bookingReq.pickupLocation.latitude,
                    longitude: bookingReq.pickupLocation.longitude
                },
                pickup_time: bookingReq.pickupTime,
                destination_address: bookingReq.destinationAddress,
                destination: {
                    latitude: bookingReq.destination.latitude,
                    longitude: bookingReq.destination.longitude
                },
                time_completion: bookingReq.timeCompletion,
                total_price: bookingReq.totalPrice,
                total_distance: bookingReq.totalDistance
            })
        );

        const bookingDto = dto.BookingDto(booking);
        return bookingDto;
    } catch (error) {
        throw error;
    }
}
module.exports = { GetListBookings, CreateNewBooking, GetBookingDetails };
