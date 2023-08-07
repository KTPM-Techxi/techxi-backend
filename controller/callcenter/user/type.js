const filterReq = (req) => ({
    roles: Array.isArray(req.roles) ? [] : [req.roles],
    currentPageStr: req.current_page,
    pageSizeStr: req.page_size
});
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingsResponse:
 *       type: object
 *       properties:
 *         bookingId:
 *           type: string
 *           description: Booking ID.
 *         callCenterAgentsId:
 *           type: string
 *           description: ID of the call center agent.
 *         customerId:
 *           type: string
 *           description: ID of the customer.
 *         driverId:
 *           type: string
 *           description: ID of the driver.
 *         pickupLocation:
 *           type: object
 *           properties:
 *             longtitude:
 *               type: number
 *             latitude:
 *               type: number
 *           description: Pickup location coordinates.
 *         pickupLime:
 *           type: string
 *           description: Pickup time in TODO format.
 *         destination:
 *           type: object
 *           properties:
 *             longtitude:
 *               type: number
 *             latitude:
 *               type: number
 *           description: Destination coordinates.
 *         time_completion:
 *           type: number
 *           description: Time taken for completion in minutes.
 *         scheduledTime:
 *           type: string
 *           description: Scheduled time in format TODO format'.
 *         totalPrice:
 *           type: number
 *           description: Total price of the booking.
 *         totalDistance:
 *           type: number
 *           description: Total distance of the booking.
 *         status:
 *           type: number
 *           description: Status of the booking.
 *         createdAt:
 *           type: string
 *           description: Creation timestamp in TODO format'.
 *         updatedAt:
 *           type: string
 *           description: Update timestamp in TODO format'.
 */

const UserInfoResponse = (user) => ({
    id: driverDto.id,
    name: driverDto.name,
    email: driverDto.email,
    phoneNumber: driverDto.phoneNumber,
    adddriverDtos: driverDto.adddriverDtos,
    avartarUrl: driverDto.avatarUrl,
    dob: driverDto.dob,
    role: driverDto.role
})

module.exports = {
    filterReq,
    UserInfoResponse
};
