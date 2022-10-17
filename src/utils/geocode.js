import fetch from "node-fetch";

const KEY = "pk.eyJ1IjoiYmFycm96b2swIiwiYSI6ImNsOTQyaHA0eTF5dmU0MGs0aWV0MTRueHcifQ.7AeEE9zet6RsurBdeUZO_Q";

async function geocode(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${KEY}&limit=1`;

    let response, data;

    // Connection failure
    try {
        response = await fetch(url);
    } 
    catch (e) {
        return callback("Unable to connect to location services!", undefined);
    }

    // 
    try {
        data = await response.json();

        // User input error
        if (data.message || data.features.length == 0) {
            throw new Error("Enable to find location");
        }
    }

    catch (e) {
        if (e.code == "ENOTFOUND") {
            return callback("Unable to connect to location services!", undefined);
        }
        return callback(e.message, undefined);
    }

    const {
        features: [
            { center: [longitude, latitude], place_name: location }
        ]
    } = data

    callback(undefined, { longitude, latitude, location });
}

export default geocode;