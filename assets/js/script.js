//global declarations
const recents = document.querySelector('.recents');
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");

//Search Declarations
const searchBtnNav = document.querySelector('#searchBtnNav');
const searchBtnLg = document.querySelector('#searchBtnLG');
const userInputNav = document.querySelector('#citySNav');
const userInputLg = document.querySelector('#citySLG');

//declarations to display info
const cCity = document.querySelector("#cCity");
const cTemp= document.querySelector(".cTemp");
const cWind= document.querySelector(".cWind");
const cHumid= document.querySelector(".cHumid");

const apiKey="dd470cbf4f5da7a6f9f1f03c52320e07";

//declarations for geo API
let cityName=""
let lat=""
let lon=""
//declarations for weather API
let tTemp=""
let tWind=""
let tHumid=""
let tIcon=""
let tId=""

//dayJS Declarations
const navTime=document.querySelector(".time");
const today=dayjs().format('MM/DD/YYYY')
const time=dayjs().format('hh:mm a')

navTime.innerHTML=time;

function searchCity(){ //This function serves to get the lat and lon of the searched city. 

    //Because of the two search bars for the styling had to plug them in as one or the other.
    if (userInputNav.value) {
        cityName = userInputNav.value;
    } else if (userInputLg.value) {
        cityName = userInputLg.value;
    }
    console.log('User city name: ', cityName);

    cCity.textContent = cityName + "  " + today


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
        console.log('API Response Data Location:', data);

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

function getWeather() { //This function takes the lat and lon of the last and uses it to get weather information
    
    const url=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=Imperial`;
    const weatherIcon = document.querySelector(".weatherIcon");
    
    fetch(url)
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        } return response.json();
    })
    .then(data => {
        console.log('Weather Response: ',data);

        if(data) {
            const dailyForecast = data.list.slice(0,48);

            //Displays today's weather
            tTemp=data.list[0].main.temp;
            tWind=data.list[0].main.humidity;
            tHumid=data.list[0].wind.speed;
            tIcon=data.list[0].weather[0].icon;
            tId=data.list[0].weather[0].id;

            //const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

            cTemp.innerHTML= `Temp: ${tTemp} °F`;
            cWind.innerHTML= `Wind Speed: ${tWind}mph`;
            cHumid.innerHTML= `Humidity: ${tHumid}%`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${tIcon}@2x.png`

            console.log("Temp: ", tTemp);
            console.log("wind: ", tWind);
            console.log("humid: ", tHumid);
            console.log("Icon: ", tIcon);
            console.log("ID: ", tId);
            console.log("weatherIcon src: ", weatherIcon.src);  
            console.log("Daily Forecast: ", dailyForecast); 
            
            //Five Day weather Code

            //Organizing data into bundles by day
            const bundleSize = 8; 
            const bundledForecasts = [];
            
            for (let i = 0; i < dailyForecast.length; i += bundleSize) {
                if (bundledForecasts.length < 6) {
                    bundledForecasts.push(dailyForecast.slice(i, i + bundleSize));
                }
            }

            //Declarations for the UL's
            aDay=document.querySelector("#aDay");
            bDay=document.querySelector("#bDay");
            fDay=document.querySelector("#fDay");
            dDay=document.querySelector("#dDay");
            eDay=document.querySelector("#eDay");

            //setting variables for each day.

            //First Day - aDay
            aTemp=bundledForecasts[1][0].main.temp;
            aWind=bundledForecasts[1][0].wind.speed
            aHumid=bundledForecasts[1][0].main.humidity;
            aIcon=bundledForecasts[1][0].weather[0].icon;
            
            //Second day - bDay
            bTemp=bundledForecasts[2][0].main.temp;
            bWind=bundledForecasts[2][0].wind.speed
            bHumid=bundledForecasts[2][0].main.humidity;
            bIcon=bundledForecasts[2][0].weather[0].icon;

            //Third day - fDay
            fTemp=bundledForecasts[3][0].main.temp;
            fWind=bundledForecasts[3][0].wind.speed;
            fHumid=bundledForecasts[3][0].main.humidity;
            fIcon=bundledForecasts[3][0].weather[0].icon;

            //Fourth day - dDay
            dTemp=bundledForecasts[4][0].main.temp;
            dWind=bundledForecasts[4][0].wind.speed;
            dHumid=bundledForecasts[4][0].main.humidity;
            dIcon=bundledForecasts[4][0].weather[0].icon;

            //Fith day - eDay
            eTemp=bundledForecasts[5][0].main.temp;
            eWind=bundledForecasts[5][0].wind.speed
            eHumid=bundledForecasts[5][0].main.humidity;
            eIcon=bundledForecasts[5][0].weather[0].icon;

            //Applies five day info to each day to show on HTML.

            aTemp.innerHTML= `Temp: ${aTemp} °F`;
            aWind.innerHTML= `Wind Speed: ${aWind}mph`;
            aHumid.innerHTML= `Humidity: ${aHumid}%`;
            aweatherIcon.src = `https://openweathermap.org/img/wn/${aIcon}@2x.png`

            bTemp.innerHTML= `Temp: ${bTemp} °F`;
            bWind.innerHTML= `Wind Speed: ${bWind}mph`;
            bHumid.innerHTML= `Humidity: ${bHumid}%`;
            bweatherIcon.src = `https://openweathermap.org/img/wn/${bIcon}@2x.png`

            fTemp.innerHTML= `Temp: ${fTemp} °F`;
            fWind.innerHTML= `Wind Speed: ${fWind}mph`;
            fHumid.innerHTML= `Humidity: ${fHumid}%`;
            fweatherIcon.src = `https://openweathermap.org/img/wn/${fIcon}@2x.png`

            dTemp.innerHTML= `Temp: ${dTemp} °F`;
            dWind.innerHTML= `Wind Speed: ${dWind}mph`;
            dHumid.innerHTML= `Humidity: ${dHumid}%`;
            dweatherIcon.src = `https://openweathermap.org/img/wn/${dIcon}@2x.png`

            eTemp.innerHTML= `Temp: ${eTemp} °F`;
            eWind.innerHTML= `Wind Speed: ${eWind}mph`;
            eHumid.innerHTML= `Humidity: ${eHumid}%`;
            eweatherIcon.src = `https://openweathermap.org/img/wn/${eIcon}@2x.png`


            console.log("Drive: ", aWind);
            console.log("Icon src: ", weatherIcon.src);
            console.log('Bundled Forecasts: ', bundledForecasts);
          }})
    .catch(error => {
        console.error('Fetch error: ', error);
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