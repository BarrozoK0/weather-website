const baseAddress = "/weather?address=";


const weatherForm = document.querySelector("form");
const search = document.querySelector("input")

// Response message
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2")


// Get weather fecth function
function getWeather(address, callback) {
    fetch(baseAddress + address)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(e => msg1.textContent = "Unexpected Error!");
}


// Adding event
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value;

    msg1.textContent = "Loading...";
    msg2.textContent = "";
    getWeather(location, ({ error, data, location }) => {
        if (error) return msg1.textContent = error;
        msg1.textContent = location;
        msg2.textContent = data;
    });
});
