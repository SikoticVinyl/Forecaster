// Global declarations
const recents = document.querySelector('.recents');
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");

// Search Declarations
const searchBtnNav = document.querySelector('#searchBtnNav');
const searchBtnLg = document.querySelector('#searchBtnLG');
const userInputNav = document.querySelector('#citySNav');
const userInputLg = document.querySelector('#citySLG');

// Declarations to display info
const cCity = document.querySelector("#cCity");
const cTemp = document.querySelector(".cTemp");
const cWind = document.querySelector(".cWind");
const cHumid = document.querySelector(".cHumid");

const apiKey = "dd470cbf4f5da7a6f9f1f03c52320e07";

// Declarations for geo API
let cityName = "";
let lat = "";
let lon = "";
// Declarations for weather API
let tTemp = "";
let tWind = "";
let tHumid = "";
let tIcon = "";
let tId = "";

// dayJS Declarations
const navTime = document.querySelector(".time");
const today = dayjs().format('MM/DD/YYYY');
const time = dayjs().format('hh:mm a');

navTime.innerHTML = time;

function searchCity() {
    // Check which input field contains the city name.
    if (userInputNav.value) {
        cityName = userInputNav.value;
    } else if (userInputLg.value) {
        cityName = userInputLg.value;
    }

    cCity.textContent = cityName + "  " + today;

    const gUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    fetch(gUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                lat = data[0].lat;
                lon = data[0].lon;
            }
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
}

let groupedForecasts={}; //Brings groupedForecasts to global scope to be used by next functions.
//This function takes the lat and lon of the last and uses it to get weather information
function getWeather() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=Imperial`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                const dailyForecast = data.list;

                // Group data by date
                const groupedForecasts = {};
                dailyForecast.forEach(forecast => {
                    const date = forecast.dt_txt.split(' ')[0]; // Extract date
                    if (!groupedForecasts[date]) {
                        groupedForecasts[date] = [];
                    }
                    groupedForecasts[date].push(forecast);
                });

                console.log('Grouped Forecasts: ', groupedForecasts);

                // Get today's date
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const todayString = today.toISOString().split('T')[0];

                // Iterate over the next five days
                for (let i = 0; i < 6; i++) {
                    const nextDate = new Date(today);
                    nextDate.setDate(today.getDate() + i);
                    const nextDateString = nextDate.toISOString().split('T')[0];

                    if (groupedForecasts[nextDateString]) {
                        const forecastsForDate = groupedForecasts[nextDateString];
                        //ForecastsForDate contains all the forecasts for the specified date.
                        console.log('Forecasts for next date:', forecastsForDate);
                    }
                }
            }
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
}

function displayWeatherInfo(groupedForecasts) {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0];

    // Define an array to store the next five dates
    const nextFiveDays = [];

    // Iterate over the next five days and push them to the "nextFiveDays" array
    for (let i = 1; i <= 5; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const nextDateString = nextDate.toISOString().split('T')[0];
        nextFiveDays.push(nextDateString);
    }

    // Display today's weather in the "todayWeather" section
    if (groupedForecasts[todayString] && groupedForecasts[todayString].length > 0) {
        const todayWeather = groupedForecasts[todayString][0]; // Assuming the first entry is for today's weather
        displayWeather(todayWeather, 'todayWeather');
    }

    // Display the next five days' weather
    nextFiveDays.forEach((date, index) => {
        if (groupedForecasts[date] && groupedForecasts[date].length > 0) {
            const nextDayWeather = groupedForecasts[date][0]; // Assuming the first entry is for the next day
            displayWeather(nextDayWeather, `Day ${index + 1}`);
        }
    });
}


function storeInfo() {
    // Create an array to hold the stored information
    let storedInfoArray = JSON.parse(localStorage.getItem("cInfo")) || [];

    // Create an object to store the current information
    let currentInfo = {
        cityName: cityName,
        temperature: tTemp,
        windSpeed: tWind,
        humidity: tHumid,
        weatherId: tId
    };

    // Push the current information object into the array
    storedInfoArray.push(currentInfo);

    // Store the updated array in local storage
    localStorage.setItem("cInfo", JSON.stringify(storedInfoArray));
}

function getStoredInfo() {

    let storedInfoArray = JSON.parse(localStorage.getItem("cInfo")) || [];

    for (let i = 0; i < storedInfoArray.length; i++) {
        console.log("City Name:", storedInfoArray[i].cityName);
        console.log("Temperature:", storedInfoArray[i].temperature);
        console.log("Wind Speed:", storedInfoArray[i].windSpeed);
        console.log("Humidity:", storedInfoArray[i].humidity);
        console.log("Weather ID:", storedInfoArray[i].weatherId);
    }
}

//Search button for display in the nav bar
searchBtnNav.addEventListener('click', function (){
    console.log("Button clicked");
    nowWeather.classList.remove("hidden");
    fiveDay.classList.remove("hidden");
    recents.classList.remove("hidden");
    searchCity()
    setTimeout(getWeather, 1000);
    setTimeout(storeInfo, 2000);
}
);

//Search Button for display on regular / large screens
searchBtnLg.addEventListener('click', function (){
    console.log("Button clicked");
    nowWeather.classList.remove("hidden");
    fiveDay.classList.remove("hidden");
    recents.classList.remove("hidden");
    searchCity()
    setTimeout(getWeather, 1000);
    setTimeout(storeInfo, 2000);
}
);

localStorage.clear();
//Used to clear storage for ease of working with code.