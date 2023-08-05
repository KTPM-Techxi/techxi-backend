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
const swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
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

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Techxi API Documentation",
            version: "0.1.0",
            description: "Documentation for the Techxi API",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html"
            }
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./routes/*.js"]
};
const specs = swaggerJsdoc(options);
app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true
    })
);
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
