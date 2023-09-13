const UserLoginDto = (req) => ({
    email: req.email,
    password: req.password
});

const UserRegisterDto = (req) => ({
    email: req.email,
    phoneNumber: req.phoneNumber,
    name: req.name,
    password: req.password,
    address: req.address,
    dob: req.dob,
    role: req.role,
    vehicle: {
        vehicleNumber: req.vehicle.vehicle_number,
        vehicleName: req.vehicle.vehicle_name,
        vehicleType: req.vehicle.vehicle_type
    }
});

const UserInfoDto = (req) => ({
    id: req.id,
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    address: req.address,
    avartarUrl: req.avartarUrl,
    dob: req.dob
});

module.exports = { UserLoginDto, UserRegisterDto, UserInfoDto };
