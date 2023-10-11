//global declarations
const cityList = document.querySelector(".savedCity");
const fiveDay = document.querySelector(".fiveDay");
const nowWeather = document.querySelector(".searchedCity");
const weatherIcon = document.querySelector(".weatherIcon");

//Search Declarations
const searchBtnNav = document.querySelector('#searchBtnNav');
const searchBtnLg = document.querySelector('#searchBtnLG');
const userInputNav = document.querySelector('#citySNav');
const userInputLg = document.querySelector('#citySLG');

//declarations to display info
const cCity = document.querySelector("#cCity");
const cTemp= document.querySelector("#cTemp");
const cWind= document.querySelector("#cWind");
const cHumid= document.querySelector("#cHumid");

const apiKey="dd470cbf4f5da7a6f9f1f03c52320e07";

//declarations for geo API
// let cityName="Sandy" (test)
let cityName=""
let lat=""
let lon=""
//declarations for weather API
let temp=""
let wind=""
let humid=""
let icon=""
let id=""

//dayJS Declarations
const today=dayjs().format('MM/DD/YYYY')

function searchCity(){

    //Because of the two search bars for the styling had to plug them in as one or the other.
    if (userInputNav.value) {
        cityName = userInputNav.value;
    } else if (userInputLg.value) {
        cityName = userInputLg.value;
    }
    console.log('User city name: ', cityName);

    cCity.textContent = cityName;

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

            cTemp.innerHTML= `Temp: ${temp} °F`;
            cWind.innerHTML= `Wind Speed: ${wind}mph`;
            cHumid.innerHTML= `Humidity: ${humid}%`;

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


searchBtnNav.addEventListener('click', function (){
    console.log("Button clicked");
    searchCity()
    setTimeout(getWeather, 1000);
}
);

searchBtnLg.addEventListener('click', function (){
    console.log("Button clicked");
    searchCity()
    setTimeout(getWeather, 1000);
}
);
//logs();