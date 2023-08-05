const logger = require("../logutil/logutil").GetLogger("CONVERT_VARIABLE");

function ConvertToType(value, targetType) {
    switch (targetType) {
        case "string":
            return String(value);
        case "number":
            return isNaN(Number(value)) ? logger.error("Error while parse number") : Number(value);
        case "boolean":
            return /^(true|false)$/i.test(value) ? value.toLowerCase() === "true" : value;
        case "date":
            const dateValue = new Date(value);
            return isNaN(dateValue.getTime()) ? logger.error("Error while parse date") : dateValue;
        case "object":
            try {
                return JSON.parse(value);
            } catch (error) {
                logger.error("Error while parse object ", error);
            }
        default:
            throw new Error(`Unsupported targetType: ${targetType}`);
    }
}

const LogObject = (obj, indent = "") => {
    let result = "";
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const valueType = typeof value;
            result += `${indent}${key}: ${value} (${valueType})\n`;
            if (valueType === "object") {
                result += logObject(value, indent + "  ");
            }
        }
    }
    return result;
};

module.exports = { ConvertToType, LogObject };
