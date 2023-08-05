// TODO: Handle status codes
// Booking Status
const BOOKING_STATUS = Object.freeze({
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
});

// Other Constants
const MAX_CONFIRM_TIME = 10;
const DEFAULT_BOOKING_TIME = 15; // in minutes
