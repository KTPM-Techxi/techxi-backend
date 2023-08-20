const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cfg = require("./common/config/config").loadConfig();
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const callcenter = require("./routes/callcenter");

const logutil = require("./common/logutil/logutil");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");
const plugins = require("./plugins/map");
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
let currentPlugin = plugins;
console.log(currentPlugin);
plugins[plugins.Plugin.PLUGIN_NAME.PLUGIN_GG_MAP].initialize(plugins.Plugin.API_KEYS.googleMap);
// Thực hiện chuyển đổi plugin
app.get("/switch-plugin", async (req, res) => {
    const pluginName = req.query.plugin;
    const isSwitch = await switchPlugin(pluginName);
    if (!isSwitch) {
        res.status(400).json("Plugin not found");
    }
    res.status(200).json("Switching plugin successfully: " + pluginName);
});

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

async function switchPlugin(pluginName) {
    if (plugins[pluginName]) {
        currentPlugin = plugins[pluginName];
        currentPlugin.initialize(plugins.Plugin.API_KEYS[pluginName]);
        return true;
    } else {
        logutil.error("Plugin not found:", pluginName);
        return false;
    }
}

module.exports = app;
