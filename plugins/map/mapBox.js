const axios = require("axios");
const logutil = require("../../common/logutil").GetLogger("mapBox.js");
const MAPBOX_API_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
let ACCESS_TOKEN = undefined;

// Khởi tạo Mapbox API với Axios
function initializeMapBox(apiKey) {
    ACCESS_TOKEN = apiKey;
    const instance = axios.create({
        baseURL: MAPBOX_API_BASE_URL,
        timeout: 5000,
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!instance) {
        logutil.error("Connection to MAPBOX failed");
    }

    return instance;
}

// Tìm kiếm vị trí bằng tên địa điểm
async function searchLocation(query) {
    const mapboxInstance = initializeMapBox();

    try {
        const response = await mapboxInstance.get(`${encodeURIComponent(query)}.json`, {
            params: {
                access_token: ACCESS_TOKEN,
                types: "place",
                limit: 1
            }
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error fetching location data");
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initialize: initializeMapBox,
    searchLocation: searchLocation
};
