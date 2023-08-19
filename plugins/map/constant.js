const cfg = require("../../common/config/config").loadConfig();

const PLUGIN_NAME = {
    PLUGIN_GG_MAP: "googleMap",
    PLUGIN_STREET_MAP: "streetMap"
};

const API_KEYS = {
    [PLUGIN_NAME.PLUGIN_GG_MAP]: cfg.mapServices.googleMapApiKey,
    [PLUGIN_NAME.LUGIN_STREET_MAP]: cfg.mapServices.streetMapApiKey
};

module.exports = { API_KEYS, PLUGIN_NAME };
