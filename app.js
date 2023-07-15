var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cfg = require('./common/config/config').loadConfig();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Import Mongoose
const mongoose = require('mongoose');
const Role = require('./models/Role');
var app = express();
app.use(cors());
initializeDB();
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
      console.log('Connected to MongoDB');
      initial();
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
      process.exit();
    });
}
function initial() {
  Role.estimatedDocumentCount().then((count) => {
    if (count === 0) {
      const createUserRole = new Role({ name: 'user' }).save();
      const createDriverRole = new Role({ name: 'driver' }).save();
      const createAdminRole = new Role({ name: 'admin' }).save();

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
