// API Key? dd470cbf4f5da7a6f9f1f03c52320e07
//URL for Fetch: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchBtn = document.querySelector(".searchBtn");
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");
const userInput = document.querySelector(".cityS");

const apiKey="dd470cbf4f5da7a6f9f1f03c52320e07";
const url=`api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
const gUrl="";

let lat=""
let lon=""

function getWeather () {

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
}

//searchBtn.addEventListener('click', function
