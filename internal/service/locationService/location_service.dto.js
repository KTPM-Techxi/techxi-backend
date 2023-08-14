const LocationDto = (req) => ({
    phoneNumber: req.phoneNumber,
    address: req.address,
    coordinate: req.coordinate
});



module.exports = { LocationDto };
