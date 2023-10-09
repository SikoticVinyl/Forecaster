// API Key? dd470cbf4f5da7a6f9f1f03c52320e07
//URL for Fetch: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchBtn = document.querySelector(".searchBtn");
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");
const userInput = document.querySelector(".cityS");

const apiKey="dd470cbf4f5da7a6f9f1f03c52320e07";

let cityName="Sandy"
let lat=""
let lon=""

let weatherData=""

function searchCity(){

    //cityName=userInput.value; //sets the user input to the city name

    const gUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`; //API URL
    console.log("URL: ", gUrl);

    fetch(gUrl) //The fetch request

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
            return response.json();
    })
    .then(data => {
        console.log('API Response Data:', data);

        if (data) {
            lat=data[0].lat
            console.log("lat: ", lat);
            lon=data[0].lon
            console.log("lon: ", lon);
        }
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    });
};

function getWeather() {
    
    const url=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(url)
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        } return response.json();
    })
    .then(data => {
        console.log('Weather Response: ',data);

        if(data) {
            weatherData=data[1].city
            console.log("Weather Data: ", weatherData);
        }
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    });
}

//searchBtn.addEventListener('click', function (){
function logs(){
    console.log("Button clicked");
    console.log("Input: ", cityName);
    searchCity()
    setTimeout(getWeather, 1000);
}
//);

logs();