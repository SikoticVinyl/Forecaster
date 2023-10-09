// API Key? dd470cbf4f5da7a6f9f1f03c52320e07
//URL for Fetch: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchBtn = document.querySelector(".searchBtn");
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");
const userInput = document.querySelector(".cityS");

const apiKey="dd470cbf4f5da7a6f9f1f03c52320e07";
//const url=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

let cityName=""

function searchCity(){

    cityName=userInput.value; //sets the user input to the city name

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
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    });
};


let lat="" //2 in array?
let lon="" //3 ' '

//function getWeather() {
//
  //  fetch(url)
//
  //  .then(response => {
    //    if (!response.ok) {
      //      throw new Error('Network response was not ok.');
        //}
        //    return response.json();
    //})
    //.then(data => {
    //    console.log(data);
    //})
    //.catch(error => {
    //    console.error('Fetch error: ', error);
    //});
//}

searchBtn.addEventListener('click', function (){
    console.log("Button clicked");
    console.log("Input: ", cityName);
    searchCity()
});