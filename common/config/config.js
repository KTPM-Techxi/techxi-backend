const yaml = require("js-yaml");
const fs = require("fs");

// Đọc file YAML cấu hình
exports.loadConfig = function () {
    try {
        let readConfig = yaml.load(fs.readFileSync("./common/config/config.yaml", "utf8"));
        const cfg = {
            appName: readConfig.app,
            port: readConfig.http_port,
            baseUrl: readConfig.base_url,
            dbConnectString: readConfig.db_connection_string || "mongodb://localhost:27017/techxi",
            tokenSecret: readConfig.token_secret,
            authJwt: readConfig.auth_jwt,
            rabbitmq_url: readConfig.rabbitmq_url,
            mapServices: {
                googleMapApiKey: readConfig.map_services.google_map_api_key,
                streetMapApiKey: readConfig.map_services.street_map_api_key
            }
        };
        return cfg;
    } catch (e) {
        console.log(e);
    }
};
