import fetch from "node-fetch";

const KEY = "026f4d2759fd1e24c2d61cdea0cf13fe"

async function forecast(latitude, longitude, callback) {

    const url = `http://api.weatherstack.com/current?access_key=${KEY}&query=${latitude},${longitude}&units=f`

    let response, data;

    // Connection failure
    try {
        response = await fetch(url);
    }
    catch (e) {
        return callback("Unable to connect to weather service!", undefined);
    }

    try {
        data = await response.json();

        // User input error
        if (data.error) throw new Error("Unable to find location! ");
    }
    catch (e) {
        if (e.code == "ENOTFOUND") {
            return callback("Unable to connect to weather service!", undefined);
        }
        return callback(e.message, undefined);
    }

    const {
        current: {
            weather_descriptions: [description],
            temperature,
            feelslike
        }
    } = data;

    callback(undefined, 
        `${description}. It is currently ${temperature} degrees out. It feels like ${feelslike} degress out.`);
}


export default forecast;
