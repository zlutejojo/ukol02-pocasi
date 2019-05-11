import Weather from './weather-today';
import Forecast from './forecast';

let weather = new Weather();
let forecast = new Forecast();

export default class ServiceBtn {
    constructor() {

    }

    respondClick(e) { 
        
        let city = e.target.dataset.city;
        console.log("mesto "+ city);
        weather.getWeather(city).then(weatherTodayFromAPI =>
            weather.showWeather(weatherTodayFromAPI)
        );
        forecast.getForecast(city);
    } 
}