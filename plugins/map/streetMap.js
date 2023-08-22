const axios = require("axios");

const STREETMAP_API_URL = "https://api.openstreetmap.org/";

function initializeStreetMap(apiKey) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
}

async function searchLocation(address) {
    try {
        const response = await axios.get(`${STREETMAP_API_URL}/geocode`, {
            params: {
                address: address
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error while getting location err=" + error);
    }
}

module.exports = {
    initialize: initializeStreetMap,
    searchLocation: searchLocation
};
