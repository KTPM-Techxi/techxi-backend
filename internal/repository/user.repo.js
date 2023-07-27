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
        const user = await User.findOne({ email: email });
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    FindUserCredential,
    FindUserByEmail
}
