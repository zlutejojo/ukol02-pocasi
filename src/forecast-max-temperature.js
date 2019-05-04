import UnixTimeStampFormat from './unix-time-stamp-format';

export default class ForecastMaxTemperature {

    constructor() {

    }

    // získám pole, které obsahuje pole s dvěma indexy, které mi udávají první a poslední záznam pro jeden den
    getDaysFirstLastIndex(timeStampFirstItem, daysToShow){
        let unixTimeStampFormat = new UnixTimeStampFormat();
        let firstItemHour = unixTimeStampFormat.getHourFromTimeStamp(timeStampFirstItem);
        // časový posun - v Brně je o hodinu méně tj. dostávám časy 02:00, 05:00 atd.
        let timeZone = -1;
        // získám index posledního záznamu dnešního dne
        let actualDayLastIndexItem = (24 + timeZone - firstItemHour)/3;
        //index, od kterého budu získávat záznamy, tj. předpoveď začíná zítřejším dnem
        let startIndex = actualDayLastIndexItem + 1;
        let daysFirstLastIndex = [];

        let i;
        for (i = 0; i < daysToShow; i++) { 
            let dayFirstLastIndex = [];
            dayFirstLastIndex[0] = startIndex + (8 * i); // 3-10 , 11-18
            dayFirstLastIndex[1] = startIndex + 7 + (8 * i);
            daysFirstLastIndex.push(dayFirstLastIndex);   
        }
        return daysFirstLastIndex;
    }

    // ze zadaného rozsahu získám nejvyšší teplotu
    getMaxTemperature(forecastJSON, firstIndex, lastIndex){
        let maxTemperature = -100;
        let i;
        for(i = firstIndex; i <= lastIndex; i++) {
            
            let temperature = forecastJSON.list[i].main.temp_max;
            if(temperature > maxTemperature) {
                maxTemperature = temperature;
            }
        }
        return maxTemperature;
    }
}