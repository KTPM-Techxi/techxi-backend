const bcrypt = require("bcrypt");

// Hash the password using bcrypt
const hashPassword = (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
};

// Compare the password with the hashed password using bcrypt
const comparePassword = (password, hashedPassword) => {
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    return isMatch;
};

module.exports = {
    hashPassword,
    comparePassword
};
