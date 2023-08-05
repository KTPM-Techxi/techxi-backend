const { StatusCodes } = require("http-status-codes");

function WriteJsonResponseWithCode(res, statusCode, code, message) {
    res.status(statusCode).json({
        code: code,
        message: message
    });
}

function WriteJsonResponse(res, data) {
    res.status(StatusCodes.OK).json(data);
}

function WriteJsonResponseWithHTTP(res, statusCode, data) {
    res.status(statusCode).json(data);
}

module.exports = {
    WriteJsonResponse,
    WriteJsonResponseWithCode,
    WriteJsonResponseWithHTTP
};
