// API Key? dd470cbf4f5da7a6f9f1f03c52320e07
// URL for Fetch: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchBtn = document.querySelector(".searchBtn");
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");
const userInput = document.querySelector(".cityS");

const apiKey="";
const url="";
const gUrl="";

function getWeather () {

    fetch(url, {
        method: 'GET'
    })
}

