const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cfg = require("./common/config").loadConfig();
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const callcenter = require("./routes/callcenter");
const logutil = require("./common/logutil").GetLogger("app.js");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const plugins = require("./plugins/map");
const { seedMockDriverLocations } = require("./mock/driver.mock");
var app = express();
const session = require("express-session");
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
initializeDB()
    .then(() => {
        logutil.info("DB initialized");
        seedMockDriverLocations(false);
    })
    .catch((err) => {
        logutil.error(err);
    });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const oneDay = 1000 * 60 * 60 * 24;
app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: cfg.tokenSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: oneDay }
    })
);

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
    apis: ["./routes/*.js", "./routes/callcenter/*.js", "./routes/driver/*.js", "./routes/customer/*.js", "./controller/callcenter/user/type.js"]
};
const specs = swaggerJsdoc(options);
app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true
    })
);
plugins.currentPlugin = plugins.googleMap;
console.log(plugins.currentPlugin);
plugins.currentPlugin.initialize(plugins.Plugin.API_KEYS.googleMap);
// Thực hiện chuyển đổi plugin
/**
 * @swagger
 * /switch-plugin:
 *   get:
 *     summary: Switch plugin
 *     description: Thực hiện việc chuyển đổi plugin
 *     parameters:
 *       - name: plugin
 *         in: query
 *         description: Tên plugin muốn chuyển đổi
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công, plugin đã được chuyển đổi
 *       400:
 *         description: Lỗi, plugin không tồn tại hoặc có lỗi xảy ra
 */
app.get("/switch-plugin", async (req, res) => {
    const pluginName = req.query.plugin;
    const isSwitch = await switchPlugin(pluginName);
    if (!isSwitch) {
        res.status(400).json("Plugin not found");
    }
    res.status(200).json("Switching plugin successfully: " + pluginName);
});
async function switchPlugin(pluginName) {
    if (plugins[pluginName]) {
        plugins.currentPlugin = plugins[pluginName];
        console.log(plugins.currentPlugin);
        await plugins.currentPlugin.initialize(plugins.Plugin.API_KEYS[pluginName]);
        return true;
    } else {
        logutil.error("Plugin not found:", pluginName);
        return false;
    }
}
app.use("/", indexRouter);
app.use("/users", authRouter);
app.use("/api/v1/callcenter/bookings", callcenter.bookingRouter);
app.use("/api/v1/callcenter/users", callcenter.userRouter);
app.use("/api/v1/callcenter/location", callcenter.locationRouter);

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
