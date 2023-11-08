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

// Declaration to display info
const cCity = document.querySelector("#cCity");

const apiKey = "dd470cbf4f5da7a6f9f1f03c52320e07";

// Declarations for geo API
let cityName = "";
let lat = "";
let lon = "";

// dayJS Declarations
const navTime = document.querySelector(".time");
const today = dayjs().format('MM/DD/YYYY');
const time = dayjs().format('hh:mm a');

navTime.innerHTML = time;

// Function to create a city button and attach a click event listener
function createCityButton(cityName, lat, lon, container) {
    const button = document.createElement("button");
    button.textContent = cityName;
    button.className = "bg-slate-600 text-white p-2 px-4 rounded-md m-2";

    button.addEventListener("click", function () {
        handleCityButtonClick(cityName); // Call the function to handle the button click
    });

    container.appendChild(button);
}

// Function to store city data in local storage
function storeInfo(cityName, lat, lon) {
    // Retrieve any existing city data from local storage
    const existingData = JSON.parse(localStorage.getItem("cityData")) || [];

    // Create an object to store the current city information
    const currentCityData = {
        cityName: cityName,
        lat: lat,
        lon: lon,
    };

    // Check if the city data already exists in storage
    const existingCityIndex = existingData.findIndex(data => data.cityName === cityName);
    if (existingCityIndex !== -1) {
        // Update the existing city data
        existingData[existingCityIndex] = currentCityData;
    } else {
        // Add the current city data to the existing data array
        existingData.push(currentCityData);
    }

    // Store the updated data in local storage
    localStorage.setItem("cityData", JSON.stringify(existingData));
}

function handleCityButtonClick(cityName) {
    const storedCityData = localStorage.getItem("cityData");
    if (storedCityData) {
        const cityData = JSON.parse(storedCityData);
        const selectedCity = cityData.find(data => data.cityName === cityName);
        if (selectedCity) {
            getWeather(selectedCity.cityName, selectedCity.lat, selectedCity.lon);
        }
    }
}

function searchCity() {
    // Check which input field contains the city name.
    if (userInputNav.value) {
        cityName = userInputNav.value;
    } else if (userInputLg.value) {
        cityName = userInputLg.value;
    }

    cCity.textContent = cityName + "  " + today;

    const gUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
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

                // Call storeInfo to store the city data in local storage
                storeInfo(cityName, lat, lon);

                // Create a button for the recent searches section if it doesn't exist
                if (!hasCityButton(cityName, cityList)) {
                    createCityButton(cityName, lat, lon, cityList);
                }

                // Call getWeather after storing city data
                getWeather(cityName, lat, lon);
            }
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
}

// Function to check if a button for the city already exists
function hasCityButton(cityName, container) {
    const buttons = container.querySelectorAll("button");
    for (const button of buttons) {
        if (button.textContent === cityName) {
            return true; // City button already exists
        }
    }
    return false; // City button does not exist
}

//This function takes the lat and lon of the last and uses it to get weather information
function getWeather(cityName, lat, lon) {
    // Clears the content of the containers before adding new information
    for (let i = 0; i < 6; i++) {
        const containerId = i === 0 ? "todayWeather" : `Day${i}`;
        document.querySelector(`#${containerId}`).innerHTML = ""; // Clears the container
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=Imperial`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather Response: ', data);

            if (data) {
                const dailyForecast = data.list;
                console.log("Daily: ", dailyForecast);

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
                const todayString = today.toISOString().split('T')[0];

                // Iterate over the next five days
                for (let i = 0; i < 6; i++) {
                    const nextDate = new Date(today);
                    nextDate.setDate(today.getDate() + i);
                    const nextDateString = nextDate.toISOString().split('T')[0];

                    if (groupedForecasts[nextDateString]) {
                        const dayForecast = groupedForecasts[nextDateString][0];
                        const dayWeatherIcon = dayForecast.weather[0].icon;
                        const containerId = i === 0 ? "todayWeather" : `Day${i}`;
                        
                        // Create a list for the weather details
                        const ul = document.createElement("ul");
                        const theDate = dayjs(dayForecast.dt_txt).format('MM/DD/YYYY');
                        const temperature = dayForecast.main.temp;
                        const windSpeed = dayForecast.wind.speed;
                        const humidity = dayForecast.main.humidity;
                        const weatherIcon = dayForecast.weather[0].icon;

                        // Define details to display
                        const details = [
                            { label: `${theDate}`, value: ' '},
                            { label: "Temp", value: `${temperature} °F` },
                            { label: "Wind", value: `${windSpeed} mph` },
                            { label: "Humidity", value: `${humidity}%` },
                            { label: " ", value: `<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">` },
                        ];

                        // Append details to the list
                        details.forEach(item => {
                            const li = document.createElement("li");
                            li.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
                            ul.appendChild(li);
                        });

                        // Append the list to the specified container
                        document.querySelector(`#${containerId}`).appendChild(ul);
                    }
                }
            }
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
};

//Search button for display in the nav bar
searchBtnNav.addEventListener('click', function (){
    console.log("Button clicked");
    nowWeather.classList.remove("hidden");
    fiveDay.classList.remove("hidden");
    recents.classList.remove("hidden");
    searchCity();
});

//Search Button for display on regular / large screens
searchBtnLg.addEventListener('click', function (){
    console.log("Button clicked");
    nowWeather.classList.remove("hidden");
    fiveDay.classList.remove("hidden");
    recents.classList.remove("hidden");
    searchCity();
});

// Load stored city buttons
getStoredInfo();