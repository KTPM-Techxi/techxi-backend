const { isValidEmail } = require("../../common/util/emailValidate.util");
const UserCredentials = require("../models/auth/user_credential.dm");
const User = require("../models/user/user.dm");

async function FindUserCredential(id) {
    try {
        const userCredential = await UserCredentials.findOne({ id: id });
        return userCredential;
    } catch (error) {
        throw error;
    }
}
async function FindUserByEmail(email) {
    try {
        if (!isValidEmail(email)) {
            throw new Error("Invalid email format");
        }
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw error;
    }
}
async function GetRegisterData(req) {
    try {
        const { email, phoneNumber, name, password } = req.body;
        return {
            email,
            phoneNumber,
            name,
            password
        };
    } catch (error) {
        console.error("error ne`: ", error);
    }
}
module.exports = {
    FindUserCredential,
    FindUserByEmail
};
