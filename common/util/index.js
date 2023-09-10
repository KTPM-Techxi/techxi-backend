const logger = require("../logutil").GetLogger("common/util/index.js");

function ConvertToType(value, targetType) {
    const dateValue = new Date(value);
    switch (targetType) {
        case "string":
            return String(value);
        case "number":
            return isNaN(Number(value)) ? logger.error("Error while parse number") : Number(value);
        case "boolean":
            return /^(true|false)$/i.test(value) ? value.toLowerCase() === "true" : value;
        case "date":
            return isNaN(dateValue.getTime()) ? logger.error("Error while parse date") : dateValue;
        case "object":
            try {
                return JSON.parse(value);
            } catch (error) {
                logger.error("Error while parse object ", error);
            }
            break;
        default:
            throw new Error(`Unsupported targetType: ${targetType}`);
    }
}

module.exports = { ConvertToType };
