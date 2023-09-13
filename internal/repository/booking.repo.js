const bookingdm = require("../models/booking/booking.dm");
const userdm = require("../models/user/user.dm");
const driverdm = require("../models/user/driver/driver.dm");
const logger = require("../../common/logutil").GetLogger("booking.repo.js");
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
            logger.error("Error create bookings failed");
            throw new Error("Error creating bookings failed");
        }
        logger.info(JSON.stringify(booking, 0, 2));
        return booking;
    } catch (error) {
        logger.error("Error while to create bookings, err=", error);
        throw error;
    }
}

async function UpdateBooking(updateBooking, updateFields) {
    let updateFieldsRepo = {};
    if (updateFields.agentId) {
        updateBooking.call_center_agents_id = updateFields.agentId;
    }
    if (updateFields.customerId) {
        updateBooking.customer_id = updateFields.customerId;
    }
    if (updateFields.agentId) {
        updateBooking.driver_id = updateFields.driverId;
    }
    if (updateFields.customerId) {
        updateBooking.vehicle_type = updateFields.vehicleType;
    }
    if (updateFields.scheduledTime) {
        updateBooking.scheduled_time = updateFields.scheduledTime;
    }
    if (updateFields.status) {
        updateBooking.status = updateFields.status;
    }
    if (updateFields.totalPrice) {
        updateBooking.total_price = updateFields.totalPrice;
    }
    if (updateFields.totalDistance) {
        updateBooking.total_distance = updateFields.totalDistance;
    }

    logger.info(JSON.stringify(updateFieldsRepo, 0, 2));
    try {
        const updatedDoc = await updateBooking.save();
        if (updatedDoc) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { FindBookingsWithFilter, CreateBooking, FindBookingById, UpdateBooking };
