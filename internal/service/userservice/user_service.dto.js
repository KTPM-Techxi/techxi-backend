const UserLoginDto = (req) => ({
    email: req.email,
    password: req.password,
})

const UserRegisterDto = (req) => ({
    email: req.email,
    phoneNumber: req.phoneNumber,
    name: req.name,
    password: req.password,
    address: req.address,
    dob: req.dob,
    roles: req.roles,
})

const UserInfoDto = (req) => ({
    name: req.name,
    email: req.email,
    phoneNumber: req.phoneNumber,
    address : req.address,
    dob: req.dob,
})

module.exports = {UserLoginDto, UserRegisterDto, UserInfoDto}
