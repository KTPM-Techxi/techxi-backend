const logger = require("../../../common/logutil").GetLogger("location.controller.js");
const { StatusCodes } = require("http-status-codes");
const httputil = require("../../../common/httputil");
const ratingdm = require("../../../internal/models/rating.dm");
const ListRating = async (req, res) => {
    try {
        // Assuming you have a Mongoose model for your ratings, replace 'RatingModel' with your actual model name.
        const ratings = await ratingdm.Rating.find().exec();

        if (!ratings) {
            httputil.WriteJsonResponse(res, []);
            return;
        }

        httputil.WriteJsonResponse(res, ratings);
    } catch (error) {
        logger.error(error);
        httputil.WriteJsonResponseWithCode(res, error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, -1, error.message);
        return;
    }
};

module.exports = { ListRating };
