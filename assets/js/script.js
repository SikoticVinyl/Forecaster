// API Key? dd470cbf4f5da7a6f9f1f03c52320e07
//URL for Fetch: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

const searchBtn = document.querySelector(".searchBtn");
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");
const userInput = document.querySelector(".cityS");
const weatherIcon = document.querySelector(".weatherIcon");

const apiKey="dd470cbf4f5da7a6f9f1f03c52320e07";

//declarations for geo API
let cityName="Sandy"
let lat=""
let lon=""
//declarations for weather API
let temp=""
let wind=""
let humid=""
let icon=""
let id=""

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
    
    const url=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=Imperial`;
    
    fetch(url)
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        } return response.json();
    })
    .then(data => {
        console.log('Weather Response: ',data);

        if(data) {
            temp=data.list[0].main.temp;
            wind=data.list[0].main.humidity;
            humid=data.list[0].wind.speed;
            icon=data.list[0].weather[0].icon;
            id=data.list[0].weather[0].id;

            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            weatherIcon.src = iconUrl;

            console.log("Temp: ", temp);
            console.log("wind: ", wind);
            console.log("humid: ", humid);
            console.log("Icon: ", icon);
            console.log("ID: ", id);
            console.log("weatherIcon src: ", weatherIcon.src);

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