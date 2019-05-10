import Weather from './weather-today';
import Forecast from './forecast';

let weather = new Weather();
let forecast = new Forecast();

export default class ServiceBtn {
    constructor() {

    }

    respondClick(e) { 
        
        let city = e.target.id;
        console.log(city);
        weather.getWeather(city).then(weatherTodayJSON =>
            weather.showWeather(weatherTodayJSON)
        );
        forecast.getForecast(city);
    } 
}