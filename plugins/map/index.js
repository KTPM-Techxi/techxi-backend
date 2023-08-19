const googleMapsPlugin = require("./googleMap");
const streetMapPlugin = require("./streetMap");
const constantsPlugin = require("./constant");
module.exports = {
    googleMap: googleMapsPlugin,
    streetMap: streetMapPlugin,
    Plugin: constantsPlugin
};
