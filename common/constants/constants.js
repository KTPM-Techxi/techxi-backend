const STATUS = Object.freeze({
    ACTIVE: 1,
    INACTIVE: 0
});
const USER_TYPES = Object.freeze({
    CUSTOMER: "user",
    DRIVER: "driver",
    CALL_CENTER_AGENT: "admin"
});
module.exports = {
    STATUS,
    USER_TYPES
};
