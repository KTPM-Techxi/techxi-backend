const { Client } = require("@googlemaps/google-maps-services-js");
const logutil = require("../../common/logutil/logutil").GetLogger("GOOGLE_MAP_PLUGIN");
let client = null;

function initializeGoogleMaps(apiKey) {
    client = new Client({});
    client
        .elevation({
            params: {
                locations: [{ lat: 45, lng: -110 }],
                key: apiKey
            },
            timeout: 1000 // milliseconds
        })
        .then((r) => {
            logutil.info(r.data.results[0].elevation);
        })
        .catch((e) => {
            logutil.error(e.response.data.error_message);
        });
}

function geocode(address) {
    return client.geocode({ params: { address } });
}

module.exports = {
    initialize: initializeGoogleMaps,
    searchLocation: geocode
};
