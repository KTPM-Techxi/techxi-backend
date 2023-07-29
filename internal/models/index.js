const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.userCredential = require('./auth/user_credential.dm');
db.role = require('./auth/role');
db.user = require('./user/user.dm');
db.ROLES = [UserType.CUSTOMER, UserType.CALL_CENTER_AGENT, UserType.DRIVER];

module.exports = db;
