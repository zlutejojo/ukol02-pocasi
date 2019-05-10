import getWeatherIcon from './weather-icons';
import UnixTimeStampFormat from './unix-time-stamp-format';

const API_KEY = 'd759207c30176fd30fa903932a54668a';
const API_BASE =  'https://api.openweathermap.org/data/2.5/';

export default class Weather {
    constructor() {

    }


    async getWeather(city){

        /*
        // kdyz pouziju tuhle cast kodu, tak u funkce nebude async

        fetch(API_BASE + 'weather?q=' + city + '&units=metric&lang=cz&appid=' + API_KEY)
        .then(response => response.json())
        .then(dataFromAPI => {
        
        console.log(dataFromAPI);
        
        this.showWeather(dataFromAPI);
    })
    */  
        
        return await fetch(API_BASE + 'weather?q=' + city + '&units=metric&lang=cz&appid=' + API_KEY).then(response => response.json());   
    }


    showWeather(dataFromAPI){

        let unixTimeStampFormat = new UnixTimeStampFormat();

        document.querySelector('#mesto').textContent = dataFromAPI.name;    
        document.querySelector('#teplota').textContent = Math.round(dataFromAPI.main.temp);
        document.querySelector('#popis').textContent = dataFromAPI.weather[0].description;

        //vraci kus html, ktery chci vlozit do html v indexu
        let krasnaIkona = getWeatherIcon(dataFromAPI.weather[0].id, dataFromAPI.weather[0].icon);
        console.log("today ikona " + dataFromAPI.weather[0].icon);
        let ikonaHTMLElement = document.querySelector('#ikona');
        ikonaHTMLElement.innerHTML = krasnaIkona;
        
        document.querySelector('#vitr').textContent = Number.parseFloat(dataFromAPI.wind.speed).toFixed(1);
        document.querySelector('#vlhkost').textContent = dataFromAPI.main.humidity;

        let sunrise = dataFromAPI.sys.sunrise; 
        document.querySelector('#vychod').textContent = unixTimeStampFormat.getHourFromTimeStamp(sunrise) + ":" + unixTimeStampFormat.getMinuteFromTimeStamp(sunrise);

        let sunset = dataFromAPI.sys.sunset;
        document.querySelector('#zapad').textContent = unixTimeStampFormat.getHourFromTimeStamp(sunset) + ":" + unixTimeStampFormat.getMinuteFromTimeStamp(sunset);
    }
}