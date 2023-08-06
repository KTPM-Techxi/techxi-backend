const bookingdm = require("../../models/booking/booking.dm");
const dto = require("./booking_service.dto");
const repo = require("../../repository/booking.repo");
const logger = require("../../../common/logutil/logutil").GetLogger("BOOKING_SERVICE");
const { StatusCodes } = require("http-status-codes");
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

module.exports = { GetListBookings };
