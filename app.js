var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cfg = require('./common/config/config').loadConfig();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Import Mongoose
const mongoose = require('mongoose');

var app = express();
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
    await mongoose.connect(cfg.dbConnectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

module.exports = app;
