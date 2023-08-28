const googleMapPlugin = require("./googleMap");
const streetMapPlugin = require("./streetMap");
const mapBoxPlugin = require("./mapBox");
const constantsPlugin = require("./constant");
module.exports = {
    currentPlugin: null,
    googleMap: googleMapPlugin,
    streetMap: streetMapPlugin,
    mapBox: mapBoxPlugin,
    Plugin: constantsPlugin
};
