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

function searchCity(){

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
            const dailyForecast = data.list.slice(0, 6);

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
        
        }
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    });
}

function storeInfo(){
    let currentInfo=["tTemp","tWind","tHumid","tId"]
    console.log("to Storage: ", currentInfo);

}

searchBtnNav.addEventListener('click', function (){
    console.log("Button clicked");
    nowWeather.classList.remove("hidden");
    fiveDay.classList.remove("hidden");
    recents.classList.remove("hidden");
    searchCity()
    setTimeout(getWeather, 1000);
}
);

searchBtnLg.addEventListener('click', function (){
    console.log("Button clicked");
    nowWeather.classList.remove("hidden");
    fiveDay.classList.remove("hidden");
    recents.classList.remove("hidden");
    searchCity()
    setTimeout(getWeather, 1000);
}
);
//logs();