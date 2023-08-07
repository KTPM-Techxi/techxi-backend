const filterReq = (req) => ({
    currentPageStr: req.current_page,
    pageSizeStr: req.page_size
});
/**
 * @swagger
 * components:
 *   schemas:
 *     BookingReponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User ID.
 *         name:
 *           type: string
 *           description: User's name.
 *         email:
 *           type: string
 *           description: User's email address.
 *         phoneNumber:
 *           type: string
 *           description: User's phone number.
 *         address:
 *           type: string
 *           description: User's address.
 *         avartarUrl:
 *           type: string
 *           description: URL of the user's avatar.
 *         dob:
 *           type: string
 *           description: Date of Birth in TODO format.
 *         role:
 *           type: string
 *           description: User's role.
 */
module.exports = {
    filterReq
};
