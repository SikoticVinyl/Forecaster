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
const DayTT = document.querySelector("#DayTT");
const DayTW = document.querySelector("#DayTW");
const DayTH = document.querySelector("#DayTH");

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

//This function takes the lat and lon of the last and uses it to get weather information
function getWeather() {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=Imperial`;
    const weatherIcon = document.querySelector(".weatherIcon");

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
                today.setHours(0, 0, 0, 0);
                const todayString = today.toISOString().split('T')[0];

                // Iterate over the next five days
                for (let i = 1; i < 5; i++) {
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
                            { label: " ", value: `<img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">` },
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