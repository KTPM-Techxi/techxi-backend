const bookingdm = require("../models/booking/booking.dm");
const userdm = require("../models/user/user.dm");
const driverdm = require("../models/user/driver/driver.dm");
const logger = require("../../common/logutil").GetLogger("BOOKING_REPO");
async function FindBookingsWithFilter(filter) {
    try {
        let query = bookingdm.Booking.find();

        const total = await bookingdm.Booking.count({})
            .then((count) => {
                logger.info("Total documents:", count);
            })
            .catch((err) => {
                logger.error("Error counting documents:", err);
            });

        query = query.skip(filter.currentPage * filter.pageSize - filter.pageSize).limit(filter.pageSize);

        const bookings = await query.exec();
        logger.info("Bookings", bookings);
        return { bookings, isFound: true, total };
    } catch (error) {
        logger.error("Error while to get bookings, err=", error);
        throw error;
    }
}
async function FindBookingById(id) {
    try {
        const booking = await bookingdm.Booking.findById(id);
        return booking;
    } catch (error) {
        logger.error("Error while to get bookings, err=", error);
        throw error;
    }
}
async function CreateBooking(req) {
    try {
        const booking = await bookingdm.Booking.create(req);
        if (!booking) {
            logger.error("Error while to create bookings, err=", error);
            throw new Error("Error creating bookings failed");
        }
        return booking;
    } catch (error) {
        logger.error("Error while to create bookings, err=", error);
        throw error;
    }
}
module.exports = { FindBookingsWithFilter, CreateBooking, FindBookingById };
