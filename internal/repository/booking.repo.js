const bookingdm = require("../models/booking/booking.dm");
const userdm = require("../models/user/user.dm");
const driverdm = require("../models/user/driver/driver.dm");
const logger = require("../../common/logutil/logutil").GetLogger("BOOKING_REPO");
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
// const users = [];
// for (let i = 0; i < bookings.length; i++) {
//     users.push(await userdm.User.findById(bookings[i].user_id))
// }

// const drivers = [];
// for (let i = 0; i < bookings.length; i++) {
//     drivers.push(await driverdm.Driver.findById(bookings[i].driver_id))
// }
module.exports = { FindBookingsWithFilter };
