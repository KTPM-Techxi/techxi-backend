const jwt = require("jsonwebtoken");
const config = require("../common/config").loadConfig();
const { StatusCodes } = require("http-status-codes");
const userdm = require("../internal/models/user/user.dm");
const logger = require("../common/logutil").GetLogger("authJwt.js");
const cookie = require("cookie");
const session = require("express-session");
//TODO: Check ROLE
isAuthenticated = async (req, res, next) => {
    if (config.authJwt === 0) {
        next();
        return;
    }
    let cookieParser = cookie.parse(req.headers.cookie);
    logger.info("req.headers.cookie: " + req.headers.cookie);
    let token = cookieParser.token;
    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).send({ message: "No token provided!" });
    }

    try {
        logger.info("Token: " + token);
        jwt.verify(token, config.tokenSecret, async (err, decoded) => {
            if (err) {
                logger.error("Error verifying token: " + err);
                throw err;
            }
            req.session.userId = decoded.id;
            req.session.role = await userdm.User.findById(req.session.userId);
            if (!req.session.role) {
                logger.error("User not found");
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: "Unauthorized!"
                });
            }
            logger.info("User authenticated", req.userId, req.session.role);
            next();
        });
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: "Unauthorized!"
        });
    }
};

module.exports = { isAuthenticated };
