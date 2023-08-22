const googleMapPlugin = require("./googleMap");
const streetMapPlugin = require("./streetMap");
const constantsPlugin = require("./constant");
module.exports = {
    currentPlugin: null,
    googleMap: googleMapPlugin,
    streetMap: streetMapPlugin,
    Plugin: constantsPlugin
};
