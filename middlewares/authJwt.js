const jwt = require("jsonwebtoken");
const config = require("../common/config/config").loadConfig();
const { StatusCodes } = require("http-status-codes");
//TODO: Check ROLE
isAuthenticated = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (config.authJwt === 0) {
        next();
        return;
    }
    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.tokenSecret, (err, decoded) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = { isAuthenticated };
