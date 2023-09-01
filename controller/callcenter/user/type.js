const filterReq = (req) => ({
    roles: Array.isArray(req.roles) ? req.roles : [req.roles],
    currentPageStr: req.current_page,
    pageSizeStr: req.page_size
});
/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfoResponse:
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
const UserInfoResponse = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    avartarUrl: user.avatarUrl,
    dob: user.dob,
    role: user.role
});

module.exports = {
    filterReq,
    UserInfoResponse
};
