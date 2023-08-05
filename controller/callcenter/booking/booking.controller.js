const service = require;
const ListBookings = async (req, res) => {
    try {
        const id = await service.UserRegister(newUserRequest);
        WriteJsonResponse(res, { user_id: id });
        return;
    } catch (error) {
        WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { ListBookings };
