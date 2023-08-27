const { Client } = require("@googlemaps/google-maps-services-js");
const logutil = require("../../common/logutil/logutil").GetLogger("GOOGLE_MAP_PLUGIN");
let client = null;

async function initializeGoogleMaps(apiKey) {
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
            if (!e.response) {
                logutil.error("Error getting elevation data: " + e.response);
                return;
            }
            logutil.error(e.response.data.error_message);
        });
}

function geocode(address) {
    try {
        return client.geocode({ params: { address } });
    } catch (error) {
        logutil.error(error);
        throw error;
    }
}

module.exports = {
    initialize: initializeGoogleMaps,
    searchLocation: geocode
};
