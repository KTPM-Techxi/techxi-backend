const axios = require("axios");

const STREETMAP_API_URL = "https://api.streetmap.vn";

function initializeStreetMap(apiKey) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
}

async function searchLocation(address) {
    try {
        const response = await axios.get(`${STREETMAP_API_URL}/geocoding`, {
            params: {
                address: address
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Lỗi khi tìm kiếm địa chỉ.");
    }
}

module.exports = {
    initialize: initializeStreetMap,
    searchLocation: searchLocation
};
