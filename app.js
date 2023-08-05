const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cfg = require("./common/config/config").loadConfig();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const logutil = require("./common/logutil/logutil");
const mongoose = require("mongoose");
var app = express();
app.use(cors());
initializeDB()
    .then(() => {
        logutil.info("DB initialized");
    })
    .catch((err) => {
        logutil.error(err);
    });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);

async function initializeDB() {
    await mongoose
        .connect(cfg.dbConnectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            logutil.info("Connected to the database");
        })
        .catch((error) => {
            logutil.error("Error connecting to MongoDB:", error);
            process.exit();
        });
}
module.exports = app;
