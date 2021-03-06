import getWeatherIcon from './weather-icons';
import {convertNightIconToDay} from './weather-icons';
import UnixTimeStampFormat from './unix-time-stamp-format';
import TimeZoneFormat from './time-zone-format';

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
        let dataFromAPI = await fetch(API_BASE + 'weather?q=' + city + '&units=metric&lang=cz&appid=' + API_KEY).then(response => response.json());
        let timeZoneFormat = new TimeZoneFormat();
        //tady si upravím všechny timeStamp z API časovým posunem země, pro kterou budu zobrazovat data
        let timeShift = timeZoneFormat.timeZoneFormat(city);
        dataFromAPI.dt = dataFromAPI.dt + timeShift;
        dataFromAPI.sys.sunrise = dataFromAPI.sys.sunrise + timeShift;
        dataFromAPI.sys.sunset = dataFromAPI.sys.sunset + timeShift;
        return dataFromAPI;   
    }


    showWeather(dataFromAPI){

        let unixTimeStampFormat = new UnixTimeStampFormat();
        
        document.querySelector('#mesto').textContent = dataFromAPI.name;    
        document.querySelector('#teplota').textContent = Math.round(dataFromAPI.main.temp);
        document.querySelector('#popis').textContent = dataFromAPI.weather[0].description;

        //vrací kus html, který chci vložit do html v indexu
        let prettyIcon = getWeatherIcon(dataFromAPI.weather[0].id, convertNightIconToDay(dataFromAPI.weather[0].icon));
        let ikonaHTMLElement = document.querySelector('#ikona');
        ikonaHTMLElement.innerHTML = prettyIcon;
        
        document.querySelector('#vitr').textContent = Number.parseFloat(dataFromAPI.wind.speed).toFixed(1);
        document.querySelector('#vlhkost').textContent = dataFromAPI.main.humidity;

        let sunrise = dataFromAPI.sys.sunrise; 
        document.querySelector('#vychod').textContent = 
            unixTimeStampFormat.formatOnePlaceNumberToTwo(unixTimeStampFormat.getHourFromTimeStamp(sunrise))
             + ":" + unixTimeStampFormat.formatOnePlaceNumberToTwo(unixTimeStampFormat.getMinuteFromTimeStamp(sunrise));

        let sunset = dataFromAPI.sys.sunset;
        document.querySelector('#zapad').textContent = 
            unixTimeStampFormat.formatOnePlaceNumberToTwo(unixTimeStampFormat.getHourFromTimeStamp(sunset))
            + ":" + unixTimeStampFormat.formatOnePlaceNumberToTwo(unixTimeStampFormat.getMinuteFromTimeStamp(sunset));         
    }
}