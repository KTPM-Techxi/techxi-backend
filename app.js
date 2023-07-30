const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cfg = require('./common/config/config').loadConfig();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const logutil = require('./common/logutil/logutil');
// Import Mongoose
const mongoose = require('mongoose');
const Role = require('./internal/models/auth/role');
var app = express();
app.use(cors());
initializeDB().then(() => {
  logutil.info('DB initialized');
}).catch(err => { logutil.error(err) });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

async function initializeDB() {
  // Connect to DB
  // Thiết lập kết nối với MongoDB
  await mongoose
    .connect(cfg.dbConnectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logutil.info('Connected to the database');
      initial();
    })
    .catch((error) => {
      logutil.error('Error connecting to MongoDB:', error);
      process.exit();
    });
}
function initial() {
  Role.estimatedDocumentCount().then((count) => {
    if (count === 0) {
      const createUserRole = new Role({ name: UserType.CUSTOMER }).save();
      const createDriverRole = new Role({ name: UserType.DRIVER }).save();
      const createAdminRole = new Role({ name: UserType.CALL_CENTER_AGENT }).save();

      Promise.all([createUserRole, createDriverRole, createAdminRole])
        .then(() => {
          console.log("Added 'user', 'driver', and 'admin' roles to the roles collection");
        })
        .catch((err) => {
          console.error('Error adding roles:', err);
        });
    }
  });
}

module.exports = app;
