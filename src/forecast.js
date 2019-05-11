import getWeatherIcon from './weather-icons';
import UnixTimeStampFormat from './unix-time-stamp-format';
import ForecastMaxTemperature from './forecast-max-temperature';
import {convertNightIconToDay} from './weather-icons';

const API_KEY = 'd759207c30176fd30fa903932a54668a';
const API_BASE = 'https://api.openweathermap.org/data/2.5/';

export default class Forecast {
    constructor() {
    }


    getForecast(city) {

        let unixTimeStampFormat = new UnixTimeStampFormat();
        let forecastMaxTemperature = new ForecastMaxTemperature();

        fetch(API_BASE + 'forecast?q=' + city + '&units=metric&lang=cz&appid=' + API_KEY)
            .then(response => response.json())
            .then(dataFromAPI => {
                this.showForecast(dataFromAPI);
            })
    }


    showForecast(dataFromAPI) {
        let html = '';

        let predpovedElement = document.querySelector('#predpoved');
        let forecastMaxTemperature = new ForecastMaxTemperature();
        let unixTimeStampFormat = new UnixTimeStampFormat();
        let daysFirstLastIndex = forecastMaxTemperature.getListFirstLastIndexOfDays(dataFromAPI.list[0].dt, 4);
        let i;
        for (i = 0; i < daysFirstLastIndex.length; i++) {
            let unixTimeStamp = dataFromAPI.list[daysFirstLastIndex[i][0]].dt;

            html += `
            <div class="forecast">
                <div class="forecast__day">
                    ${unixTimeStampFormat.getDayFromTimeStamp(unixTimeStamp) + " " +
                    unixTimeStampFormat.getDateFromTimeStamp(unixTimeStamp) + ". " +
                    unixTimeStampFormat.getMonthFromTimeStamp(unixTimeStamp) + "."}
                </div>
                <div class="forecast__icon">
                    ${getWeatherIcon(dataFromAPI.list[i].weather[0].id, convertNightIconToDay(dataFromAPI.list[i].weather[0].icon))}
                </div>
                <div class="forecast__temp">
                    ${forecastMaxTemperature.getMaxTemperature(dataFromAPI, daysFirstLastIndex[i][0], daysFirstLastIndex[i][1])}
                     °C 
                </div>
          </div>`  
        }
        predpovedElement.innerHTML = html;
    }
}