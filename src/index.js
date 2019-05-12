import Weather from './weather-today';
import Forecast from './forecast';
import ServiceBtn from './service-btn';

let weather = new Weather();
let forecast = new Forecast();
let serviceBtn = new ServiceBtn();

//zobrazení main page
weather.getWeather("brno,cz").then(weatherTodayJSON =>
    weather.showWeather(weatherTodayJSON)
);
forecast.getForecast("brno,cz").then(forecastJSON =>
    forecast.showForecast(forecastJSON));

//nastavení buttonů
let brnoBtn = document.querySelector('#brno');
brnoBtn.addEventListener("click", serviceBtn.respondClick)

let bedfordBtn = document.querySelector('#bedford');
bedfordBtn.addEventListener("click", serviceBtn.respondClick)

let sydneyBtn = document.querySelector('#sydney');
sydneyBtn.addEventListener("click", serviceBtn.respondClick)



