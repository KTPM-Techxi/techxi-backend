const UserLoginDto = {
    email: String,
    password: String,
}

const UserRegisterDto = {
    email: String,
    phoneNumber: String,
    name: String,
    password: String,
    confirmPassword: String,
    address: String,
}

const UserInfo = {
    id: Number,
    name: String,
}

module.exports = {UserLoginDto, UserRegisterDto, UserInfo}
