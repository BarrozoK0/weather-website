import path from 'path';

import express from "express";
import hbs from "hbs";

import getCurrDir from "./utils/utils.js";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";


// Current path
const currentDir = getCurrDir(import.meta.url);

// Define paths for express config
const staticPath = path.join(currentDir, "../public")
const viewsPath = path.join(currentDir, "../templates/views")
const partialsPath = path.join(currentDir, "../templates/partials")

// Setup handlebars engine and template locations
const app = express();
app.set("view engine", "hbs")
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// Setup directory to serve static files
app.use(express.static(staticPath));

/* Server routes */

// Main page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Marcos Barrozo"
    });
});

// About page
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Marcos Barrozo"
    });
});

// Help page
app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text.",
        title: "Help",
        name: "Marcos Barrozo"
    });
});

// Weather page
app.get("/weather", ({ query: { address } }, res) => {

    // User must provide address query
    if (!address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    // Get weather
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: "Geocode error: " + error
            });
        }
    
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error: "Forcast error: " + error
                });
            }
            // Send weather request
            res.send({ 
                data, location, address
            });
        });
    });
});


// Products page
app.get("/products", ({ query : { search }}, res) => {
    
    // User must provide search query
    if (!search) {
        return res.send({
            error: "You must provide a search term"
        });
    }

    res.send({
        products: []
    });
});


// Help page 404 error related
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        body: "Help article not found!",
        name: "Marcos Barrozo"
    });
});

// Overall 404 error
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        body: "Page not found!",
        name: "Marcos Barrozo"
    });
});


// Start web server on port 3000
app.listen(3000, () => {
    console.log("Server is up on port 3000");
});